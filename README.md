Reproducing a problem I have with Gatsby where some of my `press.json` file records always disappear from graphql on second and subsequent runs of the development server. I can only bring them back by clearing the caches.

Reproduce the problem

1. `npm run clean`
2. `npm start`
3. Observe output, correctly finding and generating 3 press pages:
```
GENERATING
Press records found: 3
Press: createPage #182
Press: createPage #183
Press: createPage #184
Press pages created
GENERATION FINISHED
```

4. `ctrl-c` to terminate dev server
5. `npm start`
6. Observe output changed to only find 1 press page:
```
GENERATING
Press records found: 1
Press: createPage #184
Press pages created
GENERATION FINISHED
```

I suspect this is related to the IDs used in the JSON files, and the interaction between press.json and sets.json.
- If I delete the sets.json file, there's no problem querying and generating press pages.
- If I make the IDs in sets.json non-overlapping with press.json by prefixing the IDs in sets.json with "set-", the problem goes away.