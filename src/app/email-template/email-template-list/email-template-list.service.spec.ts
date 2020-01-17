import { TestBed } from '@angular/core/testing';

import { EmailTemplateListService } from './email-template-list.service';

describe('EmailTemplateListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailTemplateListService = TestBed.get(EmailTemplateListService);
    expect(service).toBeTruthy();
  });
});
