'use client';

import { useEventListener, useUnmountEffect } from 'primereact/hooks';
import React, { useContext, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import AppFooter from './AppFooter';
import AppSidebar from './AppSidebar';
import AppTopbar from './AppTopbar';
import { LayoutContext } from './context/layoutcontext';
import { PrimeReactContext } from 'primereact/api';
import { usePathname } from 'next/navigation';

const Layout = ({ children }) => {
    const { layoutConfig, layoutState = {}, setLayoutState } = useContext(LayoutContext);
    const { setRipple } = useContext(PrimeReactContext);
    const topbarRef = useRef(null);
    const sidebarRef = useRef(null);

    // Fallback if layoutState is undefined
    const safeLayoutState = {
        overlayMenuActive: false,
        staticMenuMobileActive: false,
        staticMenuDesktopInactive: false,
        profileSidebarVisible: false,
        ...layoutState, // Merge default state with actual state
    };

    const safeLayoutConfig = layoutConfig || {
        menuMode: 'static',
        inputStyle: 'outlined',
        ripple: true,
    };

    // Listener click outside of menu
    const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] = useEventListener({
        type: 'click',
        listener: (event) => {
            const isOutsideClicked = !(
                sidebarRef.current?.isSameNode(event.target) ||
                sidebarRef.current?.contains(event.target) ||
                topbarRef.current?.menubutton?.isSameNode(event.target) ||
                topbarRef.current?.menubutton?.contains(event.target)
            );

            if (isOutsideClicked) hideMenu();
        }
    });

    // Listener click outside of profile menu
    const [bindProfileMenuOutsideClickListener, unbindProfileMenuOutsideClickListener] = useEventListener({
        type: 'click',
        listener: (event) => {
            const isOutsideClicked = !(
                topbarRef.current?.topbarmenu?.isSameNode(event.target) ||
                topbarRef.current?.topbarmenu?.contains(event.target) ||
                topbarRef.current?.topbarmenubutton?.isSameNode(event.target) ||
                topbarRef.current?.topbarmenubutton?.contains(event.target)
            );

            if (isOutsideClicked) hideProfileMenu();
        }
    });

    const pathname = usePathname();
    useEffect(() => {
        hideMenu();
        hideProfileMenu();
    }, [pathname]);

    // Function to hide menu
    const hideMenu = () => {
        setLayoutState?.((prev) => ({
            ...prev,
            overlayMenuActive: false,
            staticMenuMobileActive: false,
            menuHoverActive: false,
        }));
        unbindMenuOutsideClickListener();
        unblockBodyScroll();
    };

    // Function to hide profile menu
    const hideProfileMenu = () => {
        setLayoutState?.((prev) => ({
            ...prev,
            profileSidebarVisible: false
        }));
        unbindProfileMenuOutsideClickListener();
    };

    // Block / unblock scroll on body
    const blockBodyScroll = () => {
        document.body.classList?.add('blocked-scroll') || (document.body.className += ' blocked-scroll');
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(
                new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'),
                ' '
            );
        }
    };

    // Effect for menu visibility
    useEffect(() => {
        if (safeLayoutState.overlayMenuActive || safeLayoutState.staticMenuMobileActive) {
            bindMenuOutsideClickListener();
        }

        safeLayoutState.staticMenuMobileActive && blockBodyScroll();
    }, [safeLayoutState.overlayMenuActive, safeLayoutState.staticMenuMobileActive]);

    // Effect for profile sidebar visibility
    useEffect(() => {
        if (safeLayoutState.profileSidebarVisible) {
            bindProfileMenuOutsideClickListener();
        }
    }, [safeLayoutState.profileSidebarVisible]);

    useUnmountEffect(() => {
        unbindMenuOutsideClickListener();
        unbindProfileMenuOutsideClickListener();
    });

    // Class container
    const containerClass = classNames('layout-wrapper', {
        'layout-overlay': safeLayoutConfig.menuMode === 'overlay',
        'layout-static': safeLayoutConfig.menuMode === 'static',
        'layout-static-inactive': safeLayoutState.staticMenuDesktopInactive && safeLayoutConfig.menuMode === 'static',
        'layout-overlay-active': safeLayoutState.overlayMenuActive,
        'layout-mobile-active': safeLayoutState.staticMenuMobileActive,
        'p-input-filled': safeLayoutConfig.inputStyle === 'filled',
        'p-ripple-disabled': !safeLayoutConfig.ripple
    });

    return (
        <React.Fragment>
            <div className={containerClass}>
                <AppTopbar ref={topbarRef} />
                <div ref={sidebarRef} className="layout-sidebar">
                    <AppSidebar />
                </div>
                <div className="layout-main-container">
                    <div className="layout-main">{children}</div>
                    <AppFooter />
                </div>
                <div className="layout-mask"></div>
            </div>
        </React.Fragment>
    );
};

export default Layout;
