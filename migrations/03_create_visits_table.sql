CREATE TABLE IF NOT EXISTS visits(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    url_id INTEGER,
    "ip_address" INET NOT NULL,
    "user_agent" TEXT NOT NULL,
    visited_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(url_id) REFERENCES urls(id) ON DELETE CASCADE
)