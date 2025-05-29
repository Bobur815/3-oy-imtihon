import addressRouter from "./Address.routes.js";
import branchRouter from "./Branch.routes.js";
import permissionRouter from "./Permission.routes.js";
import staffRouter from "./Staff.routes.js";
import transportRouter from "./Transport.routes.js";

const routes = [
    {url: '/staff', funk: staffRouter},
    {url: '/branch', funk: branchRouter},
    {url: '/address', funk: addressRouter},
    {url: '/permission', funk: permissionRouter},
    {url: '/transport', funk: transportRouter}
]

export default routes