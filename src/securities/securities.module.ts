import { Module } from '@nestjs/common';
import { SecuritiesService } from './services/securities.service';
import { SecuritiesController } from './controllers/securities.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET, JWT_TTL } from 'src/common/constants/security.conf';
import { APP_GUARD } from '@nestjs/core';
import { AuthenGuard } from './guards/auth.guard';

@Module({
  providers: [
    SecuritiesService,
    {
      provide: APP_GUARD,
      useClass: AuthenGuard,
    },
  ],
  controllers: [SecuritiesController],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_TTL },
    }),
  ],
})
export class SecuritiesModule {}
