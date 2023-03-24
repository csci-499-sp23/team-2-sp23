import MenuService from "../../services/menu";

export async function deleteDeprecatedMenus() {
  console.log("Deleting deprecated menu job at", new Date());
  const deletedResult = await MenuService.deleteDeprecatedMenus();
  const { deleted_foods_count, deleted_menus_count } = deletedResult;

  console.log(
    `Deleted ${deleted_foods_count} foods and ${deleted_menus_count} menus`
  );
}
