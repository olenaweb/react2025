import { Outlet, useNavigation } from "react-router-dom";
import { useTheme } from "./../store/useTheme";

const PageContainer = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return (
    <>
      {navigation.state === "loading" ? (
        <Outlet />
      ) : (
        <div
          className={
            theme === "light"
              ? "detail-page animate light-detail-page"
              : "detail-page animate dark-detail-page"
          }
        >
          <Outlet />
        </div>
      )}
    </>
  );
};

export default PageContainer;
