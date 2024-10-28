import { defineField, defineType } from 'sanity';

export const devType = defineType({
  name: 'development',
  title: 'development',
  type: 'document',
  fields: [
    // Post title field
    defineField({
      name: 'title',
      type: 'string',
      title: 'Post Title', // Descriptive label for the title field
      description: 'Enter a compelling title for the AI-related post.', // Guides the user on what to input
      validation: (Rule) => Rule.required().min(10).max(100), // Title is required, with a character limit
    }),

    // Slug for URL generation
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug', // Descriptive label for the slug
      description: 'Automatically generate the slug from the title for URL purposes.', // Explains the slug field
      options: {
        source: 'title', // Automatically generates slug from the title
        maxLength: 96, // Slug length limit
      },
      validation: (Rule) => Rule.required(), // Slug is required
    }),

    // Featured image with alt text
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      description: 'Upload a relevant featured image for the AI post.', // Explains the image's purpose
      options: {
        hotspot: true, // Allows image cropping
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text', // Alt text for accessibility and SEO
          description: 'Describe the image for visually impaired users and better SEO performance.',
          validation: (Rule) => Rule.required().max(100), // Alt text is required, with a character limit
        }),
      ],
    }),

    // Short description field
    defineField({
      title: 'Short Description',
      name: 'description',
      type: 'text',
      description: 'Provide a brief summary of the post. This will be used in post previews.', // Guides the user
      validation: (Rule) => Rule.required().min(50).max(200), // Character limit validation
    }),

    // Main content block
    defineField({
      title: 'Main Content',
      name: 'content',
      type: 'array',
      description: 'Add the main content of the post here. You can format it using headings, paragraphs, images, links, etc.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Heading 5', value: 'h5' },
            { title: 'Heading 6', value: 'h6' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                  {
                    title: 'Open in New Tab',
                    name: 'blank',
                    type: 'boolean',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              title: 'Caption',
              name: 'caption',
              type: 'string',
              options: { isHighlighted: true },
            },
            {
              title: 'Alt Text',
              name: 'alt',
              type: 'string',
              validation: (Rule) => Rule.required().warning('Alt text is important for accessibility.'),
            },
          ],
        },
        {
          type: 'object',
          name: 'customEmbed',
          title: 'Custom Embed',
          fields: [
            {
              title: 'Embed URL',
              name: 'embedUrl',
              type: 'url',
            },
          ],
          preview: {
            select: {
              title: 'embedUrl',
            },
            prepare(selection) {
              const { title } = selection;
              return {
                title: `Embed: ${title}`,
              };
            },
          },
        },
      ],
    }),
    

    // Tags for categorization
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      description: 'Add tags to categorize this post. Tags improve discoverability.', // Describes the importance of tags
      of: [{ type: 'string' }],
      options: {
        layout: 'tags', // Displays tags in a tag-style layout
      },
    }),

    // External link field
    defineField({
      title: 'External Link',
      name: 'href',
      type: 'url',
      description: 'Add a link to relevant external resources or articles (optional).', // Guides the user on adding a relevant link
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'], // Ensures the link follows a valid scheme
        }),
    }),

    // Publication date and time
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      description: 'Set the publication date and time for the post.', // Guides the user on scheduling the post
    }),
  ],
});
