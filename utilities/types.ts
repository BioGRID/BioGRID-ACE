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
