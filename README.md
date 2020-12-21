Reproduce the problem

1. `npm run clean`
2. `npm start`
3. Observe output
```
GENERATING
Press:3
Press:createPage
Press:createPage
Press:createPage
Press:pagesCreated
GENERATION FINISHED
```

4. `ctrl-c` to terminate dev server
5. `npm start`
6. Observe output changed to only have 1 press page
```
GENERATING
Press:1
Press:createPage
Press:pagesCreated
GENERATION FINISHED
```