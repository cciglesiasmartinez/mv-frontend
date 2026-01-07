export interface GetUserCollection {
    data: {
        elements: Array<{
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
        }>;
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
        nextPage: number | null;
        prevPage: number | null;
        currentLink: string;
        nextLink: string | null;
        prevLink: string | null;
    };
    meta: {
        requestId: string;
        timestamp: string;
    };
}