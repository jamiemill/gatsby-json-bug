const resolve = require("path").resolve;

// // Define the DateObj because if all days are null, Gatsby infers that they'll always be null and removes the field.
// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   const typeDefs = `
//     type SetsJson implements Node {
//       date: DateObj
//     }
//     type DateObj {
//       year: Int,
//       month: Int,
//       period: String,
//       day: Int
//     }
//     type PressJson implements Node {
//       date: DateObj
//     }
//   `
//   createTypes(typeDefs)
// }

// export const onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `SetsJson`) {
//     const slug = `/sets/${node.id}/`
//     createNodeField({
//       node,
//       name: `slug`,
//       value: slug,
//     })
//   }
//   if (node.internal.type === `ExhibitionsJson`) {
//     const slug = `/exhibitions/${node.id}/`
//     createNodeField({
//       node,
//       name: `slug`,
//       value: slug,
//     })
//   }
// }

module.exports.createPages = async function({ graphql, actions, reporter }) {
  const { createPage } = actions

  console.log("GENERATING");
  await generatePressPages(graphql, createPage, reporter)
  console.log("GENERATION FINISHED");
}

const generatePressPages = async (graphql, createPage, reporter) => {
  const result = await graphql(`
    query AllPressJson {
      allPressJson {
        nodes {
          id
          title
          subtitle
          publicationID
          date {
            year
            month
            day
          }
          images {
            filename
            order
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  console.log("Press:"+result.data.allPressJson.nodes.length);
  result.data.allPressJson.nodes.forEach(node => {
    console.log("Press:createPage");
    createPage({
      path: `/press/${node.id}/`,
      component: resolve(`src/templates/press-story.jsx`),
      context: {
        id: node.id,
        imageRelativePaths: node.images.map(i => i.filename),
      },
    })
  })
  console.log("Press:pagesCreated");

}
