export interface Permission {
  id: string;
  name: string;
  value: string;
}

export interface ToolbarOption {
  id: string;
  name: string;
  value: string;
}

export interface Link {
  id: string;
  name: string;
  path: string;
  permissions?: Permission[];
  toolbar?: ToolbarOption[];
}

export interface Module {
  id: string;
  name: string;
  permissions: Permission[];
  links: Link[];
}

export interface Role {
  id: string;
  name: string;
  modules: Module[];
}

export interface UserWithPermissions {
  id: string;
  username: string;
  name: string;
  email: string;
  role: Role;
}