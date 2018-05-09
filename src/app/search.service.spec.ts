import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { SearchService } from './search.service';
import {
  JsonpModule,
  BaseRequestOptions,
  Jsonp,
  Response,
  ResponseOptions
} from '@angular/http';

describe('SearchService', () => {
  let searchService: SearchService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JsonpModule],
      providers: [
        SearchService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Jsonp,
          useFactory: (backend, options) => new Jsonp(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
    mockBackend = TestBed.get(MockBackend);
    searchService = TestBed.get(SearchService);
  });

  it(
    'should be created',
    inject([SearchService], (service: SearchService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should return SearchItems',
    fakeAsync(() => {
      const response = {
        resultCount: 1,
        results: [
          {
            artistId: 78500,
            artistName: 'U2',
            trackName: 'Beautiful Day',
            artworkUrl60: 'image.jpg'
          }
        ]
      };

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(<ResponseOptions>{
            body: JSON.stringify(response)
          })
        );
      });

      searchService.search('U2');
      tick();

      expect(searchService.results.length).toBe(1);
      const { artist, name, thumbnail, artistId } = searchService.results[0];
      expect(artist).toBe('U2');
      expect(name).toBe('Beautiful Day');
      expect(thumbnail).toBe('image.jpg');
      expect(artistId).toBe(78500);
    })
  );
});
