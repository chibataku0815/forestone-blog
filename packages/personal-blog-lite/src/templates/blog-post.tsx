import { graphql, Link } from "gatsby"
import _ from "lodash"
import React from "react"
import {
  IoLogoFacebook,
  IoLogoPinterest,
  IoLogoReddit,
  IoLogoTwitter,
} from "react-icons/io"
import {
  FacebookShareButton,
  PinterestShareButton,
  RedditShareButton,
  TwitterShareButton,
} from "react-share"
import urljoin from "url-join"
import Layout from "../components/layout"
import PostCard from "../components/PostCard/postCard"
import PostDetails from "../components/PostDetails/postDetails"
import SEO from "../components/seo"
import {
  BlogPostDetailsWrapper,
  BlogPostFooter,
  PostShare,
  PostTags,
  RelatedPostItem,
  RelatedPostItems,
  RelatedPostTitle,
  RelatedPostWrapper,
} from "./templates.style"

const BlogPostTemplate = (props: any) => {
  const post = props.data.markdownRemark
  const { edges } = props.data.allMarkdownRemark
  const title = post.frontmatter.title
  const slug = post.fields.slug
  const siteUrl = props.data.site.siteMetadata.siteUrl
  const shareUrl = urljoin(siteUrl, slug)

  const disqusConfig = {
    shortname: process.env.DISQUS_NAME,
    config: { identifier: slug, title },
  }

  console.info(post.frontmatter.cover.publicURL)
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        meta={[
          {
            name: `og:image`,
            content: post.frontmatter.cover.publicURL,
          },
        ]}
      />
      <BlogPostDetailsWrapper>
        <PostDetails
          title={post.frontmatter.title}
          date={post.frontmatter.date}
          preview={
            post.frontmatter.cover == null
              ? null
              : post.frontmatter.cover.childImageSharp.fluid
          }
          description={post.html}
          imagePosition="top"
        />

        <BlogPostFooter
          className={post.frontmatter.cover == null ? "center" : ""}
        >
          {post.frontmatter.tags == null ? null : (
            <PostTags className="post_tags">
              {post.frontmatter.tags.map((tag: string, index: number) => (
                <Link key={index} to={`/tags/${_.kebabCase(tag)}/`}>
                  {`#${tag}`}
                </Link>
              ))}
            </PostTags>
          )}
          <PostShare>
            <span>Share This:</span>
            <FacebookShareButton url={shareUrl} quote={post.excerpt}>
              <IoLogoFacebook />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={title}>
              <IoLogoTwitter />
            </TwitterShareButton>
            <PinterestShareButton
              url={shareUrl}
              media={urljoin(siteUrl, post.frontmatter.cover.publicURL)}
            >
              <IoLogoPinterest />
            </PinterestShareButton>
            <RedditShareButton
              url={shareUrl}
              title={`${post.frontmatter.title}`}
            >
              <IoLogoReddit />
            </RedditShareButton>
          </PostShare>
        </BlogPostFooter>
        {/* <BlogPostComment
          className={post.frontmatter.cover == null ? "center" : ""}
        >
          <DiscussionEmbed {...disqusConfig} />
        </BlogPostComment> */}
      </BlogPostDetailsWrapper>

      {edges.length !== 0 && (
        <RelatedPostWrapper>
          <RelatedPostTitle>Related Posts</RelatedPostTitle>
          <RelatedPostItems>
            {edges.map(({ node }: any) => (
              <RelatedPostItem key={node.fields.slug}>
                <PostCard
                  title={node.frontmatter.title || node.fields.slug}
                  url={node.fields.slug}
                  image={
                    node.frontmatter.cover == null
                      ? null
                      : node.frontmatter.cover.childImageSharp.fluid
                  }
                  tags={node.frontmatter.tags}
                />
              </RelatedPostItem>
            ))}
          </RelatedPostItems>
        </RelatedPostWrapper>
      )}
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $tag: [String!]) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY.MM.D")
        description
        tags
        cover {
          publicURL
          childImageSharp {
            fluid(maxWidth: 1170, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
    allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { tags: { in: $tag } }
        fields: { slug: { ne: $slug } }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            tags
            cover {
              publicURL
              childImageSharp {
                fluid(maxWidth: 480, maxHeight: 285, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
