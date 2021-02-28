/**
 * This file is for declaring shared interfaces that can be
 * re-used in different areas of the site for typescript verification
 **/

 /**
 * LINKOUT LISTS FOR BUILDING URLS
 */

export interface Linkout {
    to: string;
    text: string;
    title: string;
    icon?: string;
    internal?: boolean;
    target?: string;
    prefix?: string;
    image?: string;
    accessLevel?: string;
}

/**
 * ADMIN TOOLS FOR THE ADMIN INDEX
 */

export interface AdminTool {
    to: string;
    icon: string;
    color: string;
    title: string;
    desc: string;
    access_level: string;
}
