type MarkdownNode = {
  type?: string;
  url?: string;
  children?: MarkdownNode[];
};

const routePrefixes = [
  ['../design/', '/design/'],
  ['../concept-art/', '/concept-art/'],
  ['../research/', '/research/'],
] as const;

function rewriteUrl(url: string): string {
  for (const [filePrefix, routePrefix] of routePrefixes) {
    if (url.startsWith(filePrefix)) {
      return `${routePrefix}${url.slice(filePrefix.length)}`.replace(/\.md(?=#|$)/, '');
    }
  }

  return url;
}

function walk(node: MarkdownNode): void {
  if (node.type === 'link' && node.url) {
    node.url = rewriteUrl(node.url);
  }

  node.children?.forEach(walk);
}

export default function remarkCrossRepoLinks() {
  return (tree: MarkdownNode) => walk(tree);
}
