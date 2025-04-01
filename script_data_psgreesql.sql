DO $$
DECLARE
    nombres TEXT[] := ARRAY["Carlos",
  "Javier",
  "Miguel",
  "Alejandro",
  "David",
  "Daniel",
  "Pablo",
  "María",
  "Laura",
  "Sofía",
  "Isabella",
  "Valentina",
  "Camila",
  "Lucía"];
BEGIN
    INSERT INTO users (type_document_id, user_type_id, email, name, document_number)
    SELECT
        (SELECT id FROM type_document ORDER BY RANDOM() LIMIT 1),
        (SELECT id FROM user_type ORDER BY RANDOM() LIMIT 1),
        LOWER(nombres[((i - 1) / 1000) % array_length(nombres, 1) + 1]) || i || '@example.com',
        nombres[((i - 1) / 1000) % array_length(nombres, 1) + 1],
        TO_CHAR(i, 'FM99999999999999999999')
    FROM generate_series(1, 100000) AS s(i);
END$$;