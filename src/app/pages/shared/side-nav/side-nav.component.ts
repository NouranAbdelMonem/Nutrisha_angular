import { Component, Input, OnInit } from '@angular/core';

enum sideNavTypes {
  Link = 'link',
  Section = 'section',
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() collapse = false;

  constructor() {}

  ngOnInit(): void {}
  sideNav = [
    // {
    //   title: 'DASHBOARD.NAV_TITLE',
    //   type: sideNavTypes.Link,
    //   permission: '',
    //   icon: 'fa-solid fa-gauge',
    //   href: '/dashboard',
    //   active: false,
    // },
    {
      title: 'ARTICLES.NAV_TITLE',
      type: sideNavTypes.Link,
      permission: 'canAccessBlogsModule',
      icon: 'fa fa-newspaper',
      href: '/articles',
      active: false,
    },
    {
      title: 'BLOG_VIDEOS.NAV_TITLE',
      type: sideNavTypes.Link,
      permission: 'canAccessBlogsModule',
      icon: 'fa fa-video',
      href: '/blog-videos',
      active: false,
    },
    {
      title: 'POLLS.NAV_TITLE',
      type: sideNavTypes.Link,
      permission: 'canAccessBlogsModule',
      icon: 'fa fa-poll',
      href: '/polls',
      active: false,
    },
    {
      title: 'MOBILE_USERS.NAV_TITLE',
      type: sideNavTypes.Link,
      permission: 'canAccessAppUsersModule',
      icon: 'fa fa-user',
      href: '/app/users',
      active: false,
    },
    {
      title: 'MEALS.NAV_TITLE',
      type: sideNavTypes.Link,
      permission: 'canAccessMealsModule',
      icon: 'fa-solid fa-cheese',
      href: '/meals',
      active: false,
    },
    // {
    //   title: 'ADMIN_USERS.NAV_TITLE',
    //   type: sideNavTypes.Link,
    //   permission: 'canAccessAdminUsersModule',
    //   icon: 'fa-solid fa-user-gear',
    //   href: '/admin/users',
    //   active: false,
    // },
    {
      title: 'PLAN_TEMPLATES.NAV_TITLE',
      type: sideNavTypes.Link,
      permission: 'canAccessMealPlansModule',
      icon: 'fa-solid fa-user-gear',
      href: '/plans/templates',
      active: false,
    },

    {
      title: 'ADMIN_USERS.NAV_TITLE',
      type: sideNavTypes.Link,
      permission: 'canAccessAdminUsersModule',
      icon: 'fa-solid fa-user-gear',
      href: '/admin-users',
      active: false,
    },
    {
      title: 'ROLES.NAV_TITLE',
      type: sideNavTypes.Link,
      permission: 'canAccessAdminUsersModule',
      icon: 'fa-solid fa-user-gear',
      href: '/roles',
      active: false,
    },
    {
      // title: 'POLLS.NAV_TITLE',
      // type: sideNavTypes.Section,
      // permission: 'canAccessAdminUsersModule',
      // icon: 'fa fa-poll',
      // active: false,
      // children: [
      //   {
      //     title: 'ARTICLES.NAV_TITLE',
      //     type: sideNavTypes.Link,
      //     icon: 'fa fa-newspaper',
      //     permission: 'canAccessAdminUsersModule',
      //     href: '/articles',
      //     active: false,
      //   },
      //   {
      //     title: 'POLLS.NAV_TITLE',
      //     type: sideNavTypes.Link,
      //     permission: 'canAccessAdminUsersModule',
      //     icon: 'fa fa-poll',
      //     href: '/polls',
      //     active: false,
      //   },
      // ],
    },
  ];

  expand(sideItem: any, submenu: HTMLElement) {
    const menu = submenu.children.namedItem('.menu-submenu');
    if (submenu) {
      const newHeight = submenu.style.maxHeight === '0px' ? '100%' : '0px';
      submenu.style.setProperty('max-height', newHeight);
    }
  }

  open($event) {
    $event.preventDefault();
    const menu = $event.path.find((q) => q.className.includes('menu-item'));
    for (let i = 0; i < menu.children.length; i++) {
      const item = menu.children.item(i);

      if (!item.className.includes('menu-submenu')) continue;
      item.classList.toggle('menu-submenu-open');
    }
  }
}
