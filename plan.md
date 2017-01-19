# Enhancements:
- get path dropdown to showup 
  1. separate the variable (can still be a object for const/let importing) from the import path
  2. use a fuzzy search like feature to find path of the file
  3. take the string of the file location and replace it with a special configuration (hard code to src: '<project>/components/ui/javascripts')
  4. spit that out into this string `import ${toBeImported} from '${replacedPath}/${path}'`
