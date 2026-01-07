export interface GetUserCollection {
    data: {
        elements: Array<{
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
        }>;
        page: number;
        size: number;
        total_elements: number;
        total_pages: number;
        has_next: boolean;
        has_previous: boolean;
        next_page: number | null;
        prev_page: number | null;
        current_link: string;
        next_link: string | null;
        prev_link: string | null;
    };
    meta: {
        requestId: string;
        timestamp: string;
    };
}