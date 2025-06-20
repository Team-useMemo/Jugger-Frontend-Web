import { CategoryProp } from '@ts/Category.Prop';
import { MenuComponentProps } from '@hooks/useMenu';
import { MenuContainer, MenuContainerItem } from './Menu.Style';

const MemoCollectionCategoryMenu = ({ menuRef, props, actions }: MenuComponentProps) => {
  const { currentCategory, categories } = props;

  const category = categories.find((e: any) => e.categoryId == currentCategory);

  const handleChangeCategory = (category: CategoryProp) => {
    actions?.[0](category.categoryId);
  };

  return (
    <MenuContainer
      ref={menuRef}
      left="-14px"
      top="-18px"
      margin="0"
      minWidth="160px"
      width="calc(100% + 12px)"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <MenuContainerItem color={category.categoryColor}>
        <p>{category.categoryName}</p>
      </MenuContainerItem>
      <span className="divider" />
      {categories.map(
        (e: any) =>
          e.categoryId != category.categoryId && (
            <MenuContainerItem color={e.categoryColor} onClick={() => handleChangeCategory(e)}>
              <p>{e.categoryName}</p>
            </MenuContainerItem>
          ),
      )}
    </MenuContainer>
  );
};

export default MemoCollectionCategoryMenu;
