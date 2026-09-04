import { query } from "../config/postgres.js";

/**
 * Controller to fetch all motorcycle service guides with associated categories via SQL JOIN.
 * Endpoint: GET /api/service-guides
 */
export const getServiceGuides = async (req, res) => {
  try {
    const sqlQuery = `
      SELECT 
        g.id AS guide_id,
        g.title,
        g.interval_km,
        g.estimated_cost,
        g.description,
        c.id AS category_id,
        c.name AS category_name,
        c.description AS category_description
      FROM service_guides g
      JOIN categories c ON g.category_id = c.id
      ORDER BY g.interval_km ASC;
    `;

    const result = await query(sqlQuery);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("PostgreSQL Query Error (getServiceGuides):", error);
    res.status(500).json({
      success: false,
      message: "Database query failed while fetching service guides.",
      error: error.message,
    });
  }
};

/**
 * Controller to fetch service guides filtered by category ID using a parameterized SQL JOIN query.
 * Endpoint: GET /api/service-guides/category/:categoryId
 */
export const getServiceGuidesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const sqlQuery = `
      SELECT 
        g.id AS guide_id,
        g.title,
        g.interval_km,
        g.estimated_cost,
        g.description,
        c.id AS category_id,
        c.name AS category_name,
        c.description AS category_description
      FROM service_guides g
      JOIN categories c ON g.category_id = c.id
      WHERE g.category_id = $1
      ORDER BY g.interval_km ASC;
    `;

    // Parameterized query execution prevents SQL injection
    const result = await query(sqlQuery, [categoryId]);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("PostgreSQL Query Error (getServiceGuidesByCategory):", error);
    res.status(500).json({
      success: false,
      message: "Database query failed while fetching category service guides.",
      error: error.message,
    });
  }
};

/**
 * Controller to fetch all service categories.
 * Endpoint: GET /api/service-guides/categories
 */
export const getServiceCategories = async (req, res) => {
  try {
    const sqlQuery = `
      SELECT id, name, description 
      FROM categories 
      ORDER BY name ASC;
    `;

    const result = await query(sqlQuery);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("PostgreSQL Query Error (getServiceCategories):", error);
    res.status(500).json({
      success: false,
      message: "Database query failed while fetching service categories.",
      error: error.message,
    });
  }
};
