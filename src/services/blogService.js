import apiCall from './apiService.js';
import { apiConfig, apiUrl, apiKey } from '../common/config/api.jsx';
export { apiConfig, apiUrl, apiKey };   
/**
 * Blog API Service
 * Handles /blogs (list) and /blog/{slug} (single post)
 */
export const blogService = {
  /**
   * Fetch all blog posts
   * @returns {Promise<Array<{id, slug, title, date, author, image, isTrending, blogHtml}>>}
   */
  fetchBlogs: async (route = 'blogs') => {
    try {
      return await apiCall('GET', `/blogs?key=${apiKey}`, null, {}, route);
    } catch (error) {
      console.error('❌ fetchBlogs failed:', error);
      throw error;
    }
  },

  /**
   * Fetch single blog post by slug
   * @param {string} slug - URL-friendly slug
   * @returns {Promise<{id, slug, title, date, author, image, isTrending, blogHtml}>}
   */
  fetchBlog: async (slug, route = 'blogs') => {
    try {
      return await apiCall('GET', `/blogs/${slug}?key=${apiKey}`, null, {}, route);
    } catch (error) {
      console.error('❌ fetchBlog failed:', error);
      throw error;
    }
  }
};

export default blogService;

