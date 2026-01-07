import { Component, OnInit, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Items } from '@core/services/items';
import { GetUserCollection } from '../../dto';

interface ItemElement{
  id: string;
  film_id?: string;
  edition_id: string;
  edition_cover_picture: string;
  film_name: string;
  edition_release_year: string | number;
  edition_country: string;
  edition_format: string;
  edition_packaging: string;
  item_case_condition: string;
  item_media_condition: string;
  item_comments: string;
  item_added_date: string;
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
  private isClient = isPlatformBrowser(this.platformId);

  elements = signal<ItemElement[]>([]);
  loading = signal(true);  // Inicia en true
  error = signal<string | null>(null);

  currentPage = signal(0);
  pageSize = signal(100);
  totalPages = signal(0);
  totalElements = signal(0);
  hasNext = signal(false);
  hasPrevious = signal(false);

  ngOnInit(): void {
    if (this.isClient) {
      this.loadCollection();
    }
  }

  private loadCollection(): void {
    this.loading.set(true);
    this.error.set(null);

    this.itemsService.getUserCollection(this.currentPage(), this.pageSize()).subscribe({
      next: (response: GetUserCollection) => {
        this.elements.set(response.data.elements);
        this.totalElements.set(response.data.total_elements || 0);
        this.totalPages.set(response.data.total_pages || 0);
        this.hasNext.set(response.data.has_next || false);
        this.hasPrevious.set(response.data.has_previous || false);
      },
      error: (err) => {
        this.error.set('Error al cargar la colección de ítems.');
        console.error('Error fetching user collection:', err);
      },
      complete: () => { 
        this.loading.set(false);
      }
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
