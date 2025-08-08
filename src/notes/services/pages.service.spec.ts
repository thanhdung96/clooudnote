import { Test, TestingModule } from '@nestjs/testing';
import { PagesService } from './pages.service';
import { NotesService } from './notes.service';
import { SectionsService } from './sections.service';
import { getModelToken } from '@nestjs/sequelize';
import { Pages } from '@notes/models/pages.models';

describe('PagesService', () => {
  let service: PagesService;
  let pageModel: typeof Pages;
  let notesService: NotesService;
  let sectionsService: SectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagesService,
        {
          provide: getModelToken(Pages),
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            destroy: jest.fn(),
          },
        },
        {
          provide: NotesService,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: SectionsService,
          useValue: {
            getSectionById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PagesService>(PagesService);
    pageModel = module.get<typeof Pages>(getModelToken(Pages));
    notesService = module.get<NotesService>(NotesService);
    sectionsService = module.get<SectionsService>(SectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findPagesByNotebook', () => {
    it('should return pages for a given notebook', async () => {
      const notebookId = 'notebook-1';
      const expectedPages = [
        { id: '1', title: 'Page 1', notebookId },
        { id: '2', title: 'Page 2', notebookId },
      ];

      jest.spyOn(pageModel, 'findAll').mockResolvedValue(expectedPages as any);

      const result = await service.findPagesByNotebook(notebookId);

      expect(pageModel.findAll).toHaveBeenCalledWith({
        where: { notebookId },
      });
      expect(result).toEqual(expectedPages);
    });
  });

  describe('findPagesByNotebookAndSection', () => {
    it('should return pages for a given notebook and section', async () => {
      const notebookId = 'notebook-1';
      const sectionId = 'section-1';
      const expectedPages = [
        { id: '1', title: 'Page 1', notebookId, sectionId },
        { id: '2', title: 'Page 2', notebookId, sectionId },
      ];

      jest.spyOn(pageModel, 'findAll').mockResolvedValue(expectedPages as any);

      const result = await service.findPagesByNotebookAndSection(
        notebookId,
        sectionId,
      );

      expect(pageModel.findAll).toHaveBeenCalledWith({
        where: { notebookId, sectionId },
      });
      expect(result).toEqual(expectedPages);
    });
  });

  describe('existing methods', () => {
    it('should get pages by section ID', async () => {
      const sectionId = 1;
      const expectedPages = [
        { id: 1, heading: 'Page 1', sectionId },
        { id: 2, heading: 'Page 2', sectionId },
      ];

      jest.spyOn(pageModel, 'findAll').mockResolvedValue(expectedPages as any);

      const result = await service.getPagesBySectionId(sectionId);

      expect(pageModel.findAll).toHaveBeenCalledWith({
        where: { sectionId },
      });
      expect(result).toEqual(expectedPages);
    });

    it('should get page by section and page ID', async () => {
      const sectionId = 1;
      const pageId = 1;
      const expectedPage = { id: pageId, heading: 'Page 1', sectionId };

      jest.spyOn(pageModel, 'findOne').mockResolvedValue(expectedPage as any);

      const result = await service.getPageById(sectionId, pageId);

      expect(pageModel.findOne).toHaveBeenCalledWith({
        where: { sectionId, id: pageId },
      });
      expect(result).toEqual(expectedPage);
    });

    it('should create a page', async () => {
      const sectionId = 1;
      const createPageDto = { heading: 'New Page' };
      const expectedPage = { id: 1, ...createPageDto, sectionId };

      jest.spyOn(pageModel, 'create').mockResolvedValue(expectedPage as any);

      const result = await service.createPage(sectionId, createPageDto);

      expect(pageModel.create).toHaveBeenCalledWith({
        ...createPageDto,
        sectionId,
      });
      expect(result).toEqual(expectedPage);
    });

    it('should update a page', async () => {
      const sectionId = 1;
      const pageId = 1;
      const updatePageDto = { heading: 'Updated Page' };
      const existingPage = {
        id: pageId,
        heading: 'Old Page',
        sectionId,
        update: jest.fn().mockResolvedValue({ ...updatePageDto }),
      };

      jest.spyOn(service, 'getPageById').mockResolvedValue(existingPage as any);

      const result = await service.updatePage(sectionId, pageId, updatePageDto);

      expect(service.getPageById).toHaveBeenCalledWith(sectionId, pageId);
      expect(existingPage.update).toHaveBeenCalledWith(updatePageDto);
      expect(result).toEqual({ ...updatePageDto });
    });

    it('should throw error when updating non-existent page', async () => {
      const sectionId = 1;
      const pageId = 1;
      const updatePageDto = { heading: 'Updated Page' };

      jest.spyOn(service, 'getPageById').mockResolvedValue(null);

      await expect(
        service.updatePage(sectionId, pageId, updatePageDto),
      ).rejects.toThrow('Page not found');
    });

    it('should delete a page', async () => {
      const sectionId = 1;
      const pageId = 1;

      jest.spyOn(pageModel, 'destroy').mockResolvedValue(1);

      await service.deletePage(sectionId, pageId);

      expect(pageModel.destroy).toHaveBeenCalledWith({
        where: { sectionId, id: pageId },
      });
    });
  });
});
