import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { signal } from '@angular/core';
import { Items } from '@core/services/items';
import { GetUserCollection } from '../../dto';

interface ItemElement{
  id: string;
  filmId: string;
  editionId: string;
  editionCoverPicture: string;
  filmName: string;
  editionReleaseYear: number;
  editionCountry: string;
  editionFormat: string;
  editionPackaging: string;
  itemCaseCondition: string;
  itemMediaCondition: string;
  itemComments: string;
  itemAddedDate: string;
}

@Component({
  selector: 'app-items-collection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items-collection.html',
  styleUrl: './items-collection.css',
})
export class ItemsCollection implements OnInit {

  private itemsService = inject(Items);
  private platformId = inject(PLATFORM_ID);

  items = signal<ItemElement[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  currentPage = signal(0);
  pageSize = signal(100);
  totalPages = signal(0);
  totalElements = signal(0);
  hasNext = signal(false);
  hasPrevious = signal(false);

  ngOnInit(): void {
    console.log('🎯 ngOnInit ejecutándose');
    console.log('🔍 Platform:', isPlatformBrowser(this.platformId) ? 'Browser' : 'Server');
    // Sólo inicializa la carga en el navegador, no en SSR
    if(isPlatformBrowser(this.platformId)) {
      this.loadCollection();
    } else {
      this.loading.set(true);
    }
  }

  private loadCollection(): void {
    this.loading.set(true);
    this.error.set(null);

    this.itemsService.getUserCollection(this.currentPage(), this.pageSize()).subscribe({
      next: (response: GetUserCollection) => {
        this.items.set(response.data.elements);
        this.totalElements.set(response.data.totalElements);
        this.totalPages.set(response.data.totalPages);
        this.hasNext.set(response.data.hasNext);
        this.hasPrevious.set(response.data.hasPrevious);
      },
      error: (err) => {
        this.error.set('Error al cargar la colección de ítems.');
        console.error('Error fetching user collection:', err);
      },
      complete: () => { this.loading.set(false); }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages()) {
      this.currentPage.set(page);
      this.loadCollection();  
    }
  } 

  nextPage(): void {
    if (this.hasNext()) {
      this.goToPage(this.currentPage() + 1);
    } 
  }

    previousPage(): void {
    if (this.hasPrevious()) {
      this.goToPage(this.currentPage() - 1);
    }
  }

}
