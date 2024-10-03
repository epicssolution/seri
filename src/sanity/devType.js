import { defineField, defineType } from 'sanity';

export const devType = defineType({
  name: 'development', // Unique schema name
  title: 'Development Post', // Display title in Sanity Studio
  type: 'document', // Declares it as a document schema
  fields: [
    // Post title
    defineField({
      name: 'title',
      type: 'string',
      title: 'Post Title', // Descriptive label for the post title
      description: 'Enter a catchy and relevant title for the development post.', // Guides the user on what to input
      validation: (Rule) => Rule.required().min(10).max(100), // Title is required, with a character limit
    }),

    // Slug for URL generation
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug', // Descriptive label for the slug
      description: 'The slug will be used in the post’s URL. It’s automatically generated from the title.', // Explanation for the slug field
      options: {
        source: 'title', // Automatically generate from the title
        maxLength: 96, // Limit slug length to 96 characters
      },
      validation: (Rule) => Rule.required(), // Required field
    }),

    // Featured image with alt text
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      description: 'Upload a high-quality featured image for the post. Use appropriate dimensions.', // Guides the user
      options: {
        hotspot: true, // Allows cropping the image
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text', // Alt text for accessibility and SEO
          description: 'Describe the image for visually impaired users and improve SEO performance.',
          validation: (Rule) => Rule.required().max(100), // Alt text is required, with a max character limit
        }),
      ],
    }),

    // Short description of the post
    defineField({
      title: ' description',
      name: 'description',
      type: 'text',
      description: 'Enter a brief summary of the post. This will appear in previews and summaries.', // Description for user guidance
      validation: (Rule) => Rule.required().min(50).max(200), // Character limit validation for the description
    }),

    // Main content of the post
    defineField({
      title: ' content',
      name: 'content',
      type: 'array',
      description: 'Write the main content of the post. You can use headings, paragraphs, and other rich text elements.', // Content writing guide
      of: [{ type: 'block' }], // Rich text support with various block types
    }),

    // Tags for categorization
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      description: 'Add tags to categorize the post and improve discoverability.', // Guides the user on adding relevant tags
      of: [{ type: 'string' }],
      options: {
        layout: 'tags', // Display tags in a compact layout
      },
    }),

    // External link for further reading
    defineField({
      title: 'External Link',
      name: 'href',
      type: 'url',
      description: 'Optional: Add a link to external resources or related content.', // Description for link input
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'], // Ensure the URI follows specific protocols
        }),
    }),

    // Published at field for date and time
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      description: 'Set the publication date and time for the post.', // Guides the user
    }),
  ],
});
