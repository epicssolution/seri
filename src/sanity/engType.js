import { defineField, defineType } from 'sanity';

// Define the schema for 'Eng' document
export const engType = defineType({
  name: 'Eng', // Unique name for the schema
  title: 'Engineering Post', // Display title in the Sanity Studio
  type: 'document', // Declaring this as a document type
  fields: [
    // Title field
    defineField({
      name: 'title',
      type: 'string',
      title: 'Post Title', // Descriptive label for the title
      description: 'Enter a catchy and relevant title for the engineering post', // Description to guide the user
      validation: (Rule) => Rule.required().min(10).max(100), // Validation: required, minimum and maximum character count
    }),

    // Slug field for URL generation
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug', // Descriptive label for the slug
      description: 'The slug will be used in the URL of the post. Generated from the title by default.', // Explanation for the slug field
      options: {
        source: 'title', // Automatically generate from the title
        maxLength: 96, // Limit slug length
      },
      validation: (Rule) => Rule.required(), // Required field
    }),

    // Image field with alt text for accessibility
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      description: 'Upload a featured image for the post. Use high-quality images.', // Description guiding the user
      options: {
        hotspot: true, // Allow cropping the image
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text', // Alt text for accessibility and SEO
          description: 'Describe the image for visually impaired users and better SEO performance.',
        }),
      ],
    }),

    // Short description for the post
    defineField({
      title: 'Short Description',
      name: 'description',
      type: 'text',
      description: 'Enter a brief description for the post. This will appear in previews.', // Description for user guidance
      validation: (Rule) => Rule.required().min(50).max(200), // Character length validation
    }),

    // Main content block with rich text editing support
    defineField({
      title: 'Main Content',
      name: 'content',
      type: 'array',
      description: 'Write the main content of the post. Use headings, paragraphs, and other formatting elements.', // Guide for writing content
      of: [{ type: 'block' }], // Allow rich text editing
    }),

    // Tags field for categorizing the post
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      description: 'Add relevant tags to categorize the post and improve discoverability.', // Explain the purpose of tags
      of: [{ type: 'string' }], // Each tag is a string
      options: {
        layout: 'tags', // Display tags in a compact layout
      },
    }),

    // External link field
    defineField({
      title: 'External Link',
      name: 'href',
      type: 'url',
      description: 'Add an optional external link for further resources or related content.', // Description for link field
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'], // Only allow certain protocols
        }),
    }),

    // Date and time when the post was published
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      description: 'Set the date and time for when this post was published.', // Explanation for publication date
    }),
  ],
});
