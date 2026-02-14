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

export const GET_ALL_MENU_ITEMS = `
  query GetAllMenuItems {
    menuItems(first: 50) {
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
