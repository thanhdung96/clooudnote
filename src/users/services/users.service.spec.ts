import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@users/services/users.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { UpdateProfileDto } from '@users/dtos/update-profile.dto';
import { RegistrationDto } from '@users/dtos/register.dto';
import { Users } from '@users/models/users.models';

describe('UsersService', () => {
  let module: TestingModule;
  let usersService: UsersService;

  const currentEmail = 'mockup_clooudnote@email.com';
  const usedEmail = 'used@email.com';
  const newEmail = 'new@email.com';
  const mockupUserRegister: RegistrationDto = {
    email: currentEmail,
    firstName: 'Mockup',
    lastName: 'User',
    password: 'mockup_password',
  };
  let currentUser: Users;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get(UsersService);
    currentUser = (await usersService.saveNewUser(mockupUserRegister)) as Users;
  });

  afterEach(async () => {
    const service = await module.resolve(UsersService);
    const mockupUser = await service.getUserByEmail(mockupUserRegister.email);
    await mockupUser?.destroy();
  });

  /**
   * Test Plan:
   * 1. Should throw NotFoundException if user with currentEmail does not exist.
   * 2. Should throw ConflictException if new email is already in use by another user.
   * 3. Should update profile if only firstName or lastName is changed and valid.
   * 4. Should update profile if email is changed to a new, unused, valid email.
   * 5. Should update profile if email is unchanged but other fields are valid.
   * 6. Should fail validation if firstName is not a string.
   * 7. Should fail validation if lastName is too short.
   * 8. Should fail validation if email is not valid.
   * 9. Should fail validation if firstName is too long.
   * 10. Should fail validation if lastName is not a string.
   */

  it('should throw NotFoundException if user not found', async () => {
    await expect(
      usersService.updateUserProfile(currentEmail + 'abc', {
        firstName: 'New',
        lastName: 'Name',
        email: 'clooudnote_admin@email.com',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw ConflictException if new email is already in use', async () => {
    const { firstName, lastName, email } = currentUser;
    const existingUser = { firstName, lastName, email };
    existingUser.email = usedEmail;
    await usersService.saveNewUser(existingUser as RegistrationDto);

    await expect(
      usersService.updateUserProfile(currentEmail, {
        firstName: 'Admin',
        lastName: 'User',
        email: usedEmail,
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('should update profile if only firstName is changed', async () => {
    await expect(
      usersService.updateUserProfile(currentEmail, {
        firstName: 'NewFirst',
        lastName: 'User',
        email: currentEmail,
      }),
    ).resolves.toBe(currentUser);
  });

  it('should update profile if only lastName is changed', async () => {
    await expect(
      usersService.updateUserProfile(currentEmail, {
        firstName: 'Mockup',
        lastName: 'NewLast',
        email: currentEmail,
      }),
    ).resolves.toBe(currentUser);
  });

  it('should update profile if email is changed to a new one', async () => {
    await expect(
      usersService.updateUserProfile(currentEmail, {
        firstName: 'Admin',
        lastName: 'User',
        email: newEmail,
      }),
    ).resolves.toBe({ ...currentUser, email: newEmail });
  });

  // Validation tests for UpdateProfileDto
  it('should fail validation if firstName is not a string', async () => {
    const dto = new UpdateProfileDto();
    dto.firstName = 123 as any;
    dto.lastName = 'ValidLast';
    dto.email = 'valid@email.com';
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'firstName')).toBe(true);
  });

  it('should fail validation if lastName is too short', async () => {
    const dto = new UpdateProfileDto();
    dto.firstName = 'ValidFirst';
    dto.lastName = 'A';
    dto.email = 'valid@email.com';
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'lastName')).toBe(true);
  });

  it('should fail validation if email is not valid', async () => {
    const dto = new UpdateProfileDto();
    dto.firstName = 'ValidFirst';
    dto.lastName = 'ValidLast';
    dto.email = 'not-an-email';
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'email')).toBe(true);
  });

  it('should fail validation if firstName is too long', async () => {
    const dto = new UpdateProfileDto();
    dto.firstName = 'A'.repeat(101);
    dto.lastName = 'ValidLast';
    dto.email = 'valid@email.com';
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'firstName')).toBe(true);
  });

  it('should fail validation if lastName is not a string', async () => {
    const dto = new UpdateProfileDto();
    dto.firstName = 'ValidFirst';
    dto.lastName = 456 as any;
    dto.email = 'valid@email.com';
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'lastName')).toBe(true);
  });
});
