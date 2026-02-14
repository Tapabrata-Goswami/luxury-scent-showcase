export const GET_MENU = `
  query GetMenu($location: MenuLocationEnum!) {
    menuItems(where: { location: $location }) {
      nodes {
        id
        label
        url
        path
        parentId
        order
      }
    }
  }
`;
