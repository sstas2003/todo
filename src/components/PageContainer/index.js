import { Route, Switch } from "react-router-dom";
import { routes } from "../../routes";
import "./style.scss";

function PageContainer(props) {
  return (
    <div className={"container"}>
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Switch>
    </div>
  );
}
export default PageContainer;
