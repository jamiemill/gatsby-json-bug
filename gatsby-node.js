const resolve = require("path").resolve;

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

  console.log("Press records found: "+result.data.allPressJson.nodes.length);
  result.data.allPressJson.nodes.forEach(node => {
    console.log("Press: createPage #"+node.id);
    createPage({
      path: `/press/${node.id}/`,
      component: resolve(`src/templates/press-story.jsx`),
      context: {
        id: node.id,
        imageRelativePaths: node.images.map(i => i.filename),
      },
    })
  })
  console.log("Press pages created");

}
