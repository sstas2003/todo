import React from 'react';
import { routes } from '../../routes';
import './style.scss';
import {Link} from "react-router-dom";
import usePresenter from "./usePresenter";

function Sidebar(props) {
  let {location}=usePresenter();
  return <div className='sidebar'>
    {routes.map(item=>
        <Link
            key={item.path}
            className={location.pathname===item.path?"item-select":"item"}
            to={item.path}
        >
          {item.name}
        </Link>
    )}
  </div>;
}

export default Sidebar;
