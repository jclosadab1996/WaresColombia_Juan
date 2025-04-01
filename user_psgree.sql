CREATE OR REPLACE FUNCTION public.sp_users(
    p_action text,
    p_id integer DEFAULT NULL,
    p_type_document_id integer DEFAULT NULL,
    p_user_type_id integer DEFAULT NULL,
    p_email text DEFAULT NULL,
    p_name text DEFAULT NULL,
    p_document_number text DEFAULT NULL,
    p_limit integer DEFAULT 10,
    p_offset integer DEFAULT 0,
    p_search_term text DEFAULT NULL
)
RETURNS TABLE(
    id integer, 
    type_document_id integer, 
    user_type_id integer, 
    email text, 
    name text, 
    document_number text, 
    name_user_type text,
    name_type_document_id text,
    total_count integer,
    has_more boolean
)
LANGUAGE plpgsql
AS $$
DECLARE
    total_records INT;
BEGIN
    CASE p_action
        WHEN 'create_user' THEN
            BEGIN
                INSERT INTO users (type_document_id, user_type_id, email, name)
                VALUES (p_type_document_id, p_user_type_id, p_email, COALESCE(p_name, 'Usuario Nuevo'))
                RETURNING id, type_document_id, user_type_id, email, name;
            EXCEPTION
                WHEN others THEN
                    RAISE EXCEPTION 'Error al crear el usuario: %', SQLERRM USING ERRCODE = SQLSTATE;
            END;

        WHEN 'get_user' THEN
            BEGIN
                RETURN QUERY SELECT id, type_document_id, user_type_id, email, name
                             FROM users
                             WHERE id = p_id;
            EXCEPTION
                WHEN others THEN
                    RAISE EXCEPTION 'Error al obtener el usuario: %', SQLERRM USING ERRCODE = SQLSTATE;
            END;

        WHEN 'update_user' THEN
            BEGIN
                UPDATE users
                SET type_document_id = p_type_document_id,
                    user_type_id = p_user_type_id,
                    email = p_email,
                    name = COALESCE(p_name, 'Usuario Actualizado')
                WHERE id = p_id
                RETURNING id, type_document_id, user_type_id, email, name;
            EXCEPTION
                WHEN others THEN
                    RAISE EXCEPTION 'Error al actualizar el usuario: %', SQLERRM USING ERRCODE = SQLSTATE;
            END;

        WHEN 'delete_user' THEN
            BEGIN
                DELETE FROM users
                WHERE id = p_id;
            EXCEPTION
                WHEN others THEN
                    RAISE EXCEPTION 'Error al eliminar el usuario: %', SQLERRM USING ERRCODE = SQLSTATE;
            END;

        WHEN 'list_users' THEN
            BEGIN
                SELECT COUNT(*) INTO total_records
                FROM users u
                WHERE p_search_term IS NULL OR u.email ILIKE '%' || p_search_term || '%'
                   OR u.name ILIKE '%' || p_search_term || '%';

                RETURN QUERY SELECT u.id, u.type_document_id, u.user_type_id, u.email, u.name, u.document_number, 
                                     ut.name as name_user_type, tp.name as name_type_document_id, 
                                     total_records, (total_records > (p_offset + p_limit))
                             FROM users u
                             INNER JOIN user_type ut ON ut.id = u.user_type_id
                             INNER JOIN type_document tp ON tp.id = u.type_document_id
                             WHERE p_search_term IS NULL OR u.email ILIKE '%' || p_search_term || '%'
                                OR u.name ILIKE '%' || p_search_term || '%'
                             ORDER BY u.id
                             LIMIT p_limit OFFSET p_offset;
            EXCEPTION
                WHEN others THEN
                    RAISE EXCEPTION 'Error al listar los usuarios: %', SQLERRM USING ERRCODE = SQLSTATE;
            END;

        ELSE
            RAISE EXCEPTION 'Acción no válida: %', p_action;
    END CASE;
END;
$$;