import { Outlet, useNavigation } from "react-router-dom";
import background from "../assets/backPicture.jpg";

const PageContainer = () => {
  const navigation = useNavigation();
  const style = {
    div: {
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  };

  return (
    <>
      {navigation.state === "loading" ? (
        <Outlet />
      ) : (
        <div className="detail-page" style={style.div}>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default PageContainer;
