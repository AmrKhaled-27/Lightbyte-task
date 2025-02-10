export type Visit = {
    id: number;
    url_id: number;
    ip_address: string;
    user_agent: string;
    visited_at: Date;
};

export type VisitStats = {
    short_url: string;
    original_url: string;
    visits_count: number;
};
