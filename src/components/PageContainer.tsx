import { Outlet, useNavigation } from "react-router-dom";

const PageContainer = () => {
  const navigation = useNavigation();
  console.log('"navigation="', navigation);
  return (
    <>
      {navigation.state === "loading" ? (
        <Outlet />
      ) : (
        <div className="detail-page">
          <Outlet />
        </div>
      )}
    </>
  );
};

export default PageContainer;
