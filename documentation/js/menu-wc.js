'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ubc_ploomes_back_end documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-7384d478f5520cdee441e5c52ea9a4080dbc6917423c76912946eec5610a9e649fe51851352deadcc16b2e6ab17f242cd7906bb73be247c3fd8c64e545206d33"' : 'data-target="#xs-controllers-links-module-AppModule-7384d478f5520cdee441e5c52ea9a4080dbc6917423c76912946eec5610a9e649fe51851352deadcc16b2e6ab17f242cd7906bb73be247c3fd8c64e545206d33"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-7384d478f5520cdee441e5c52ea9a4080dbc6917423c76912946eec5610a9e649fe51851352deadcc16b2e6ab17f242cd7906bb73be247c3fd8c64e545206d33"' :
                                            'id="xs-controllers-links-module-AppModule-7384d478f5520cdee441e5c52ea9a4080dbc6917423c76912946eec5610a9e649fe51851352deadcc16b2e6ab17f242cd7906bb73be247c3fd8c64e545206d33"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-7384d478f5520cdee441e5c52ea9a4080dbc6917423c76912946eec5610a9e649fe51851352deadcc16b2e6ab17f242cd7906bb73be247c3fd8c64e545206d33"' : 'data-target="#xs-injectables-links-module-AppModule-7384d478f5520cdee441e5c52ea9a4080dbc6917423c76912946eec5610a9e649fe51851352deadcc16b2e6ab17f242cd7906bb73be247c3fd8c64e545206d33"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7384d478f5520cdee441e5c52ea9a4080dbc6917423c76912946eec5610a9e649fe51851352deadcc16b2e6ab17f242cd7906bb73be247c3fd8c64e545206d33"' :
                                        'id="xs-injectables-links-module-AppModule-7384d478f5520cdee441e5c52ea9a4080dbc6917423c76912946eec5610a9e649fe51851352deadcc16b2e6ab17f242cd7906bb73be247c3fd8c64e545206d33"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-1e4558b8d4b2df1aa75742fa734412cc27cac263b5cca5074a22300e90d0e1b978e5dee64d984e949625f8813c3338406fda1840cdd8a0148cf530977e068419"' : 'data-target="#xs-controllers-links-module-AuthModule-1e4558b8d4b2df1aa75742fa734412cc27cac263b5cca5074a22300e90d0e1b978e5dee64d984e949625f8813c3338406fda1840cdd8a0148cf530977e068419"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-1e4558b8d4b2df1aa75742fa734412cc27cac263b5cca5074a22300e90d0e1b978e5dee64d984e949625f8813c3338406fda1840cdd8a0148cf530977e068419"' :
                                            'id="xs-controllers-links-module-AuthModule-1e4558b8d4b2df1aa75742fa734412cc27cac263b5cca5074a22300e90d0e1b978e5dee64d984e949625f8813c3338406fda1840cdd8a0148cf530977e068419"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-1e4558b8d4b2df1aa75742fa734412cc27cac263b5cca5074a22300e90d0e1b978e5dee64d984e949625f8813c3338406fda1840cdd8a0148cf530977e068419"' : 'data-target="#xs-injectables-links-module-AuthModule-1e4558b8d4b2df1aa75742fa734412cc27cac263b5cca5074a22300e90d0e1b978e5dee64d984e949625f8813c3338406fda1840cdd8a0148cf530977e068419"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-1e4558b8d4b2df1aa75742fa734412cc27cac263b5cca5074a22300e90d0e1b978e5dee64d984e949625f8813c3338406fda1840cdd8a0148cf530977e068419"' :
                                        'id="xs-injectables-links-module-AuthModule-1e4558b8d4b2df1aa75742fa734412cc27cac263b5cca5074a22300e90d0e1b978e5dee64d984e949625f8813c3338406fda1840cdd8a0148cf530977e068419"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CardModule.html" data-type="entity-link" >CardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CardModule-a1ea831d8824cdcc6604bf0b52c116e03865fedcad07d20f7e333d97c15c64b5cbe7459c21268216b398ff3c49a8f4b51ee13c8ad7eb059c2e019a3632a6ae71"' : 'data-target="#xs-controllers-links-module-CardModule-a1ea831d8824cdcc6604bf0b52c116e03865fedcad07d20f7e333d97c15c64b5cbe7459c21268216b398ff3c49a8f4b51ee13c8ad7eb059c2e019a3632a6ae71"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CardModule-a1ea831d8824cdcc6604bf0b52c116e03865fedcad07d20f7e333d97c15c64b5cbe7459c21268216b398ff3c49a8f4b51ee13c8ad7eb059c2e019a3632a6ae71"' :
                                            'id="xs-controllers-links-module-CardModule-a1ea831d8824cdcc6604bf0b52c116e03865fedcad07d20f7e333d97c15c64b5cbe7459c21268216b398ff3c49a8f4b51ee13c8ad7eb059c2e019a3632a6ae71"' }>
                                            <li class="link">
                                                <a href="controllers/CardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CardModule-a1ea831d8824cdcc6604bf0b52c116e03865fedcad07d20f7e333d97c15c64b5cbe7459c21268216b398ff3c49a8f4b51ee13c8ad7eb059c2e019a3632a6ae71"' : 'data-target="#xs-injectables-links-module-CardModule-a1ea831d8824cdcc6604bf0b52c116e03865fedcad07d20f7e333d97c15c64b5cbe7459c21268216b398ff3c49a8f4b51ee13c8ad7eb059c2e019a3632a6ae71"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CardModule-a1ea831d8824cdcc6604bf0b52c116e03865fedcad07d20f7e333d97c15c64b5cbe7459c21268216b398ff3c49a8f4b51ee13c8ad7eb059c2e019a3632a6ae71"' :
                                        'id="xs-injectables-links-module-CardModule-a1ea831d8824cdcc6604bf0b52c116e03865fedcad07d20f7e333d97c15c64b5cbe7459c21268216b398ff3c49a8f4b51ee13c8ad7eb059c2e019a3632a6ae71"' }>
                                        <li class="link">
                                            <a href="injectables/CardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PrismaModule-8a45c52f5bc506f9fcef1f4c7b34e596b06323bae0951c4fe354cc2b76489f6abcf1207439120a4bd3a6cf40174b139cda70f7a558a3f53d9bcdd3a9e74b81bf"' : 'data-target="#xs-injectables-links-module-PrismaModule-8a45c52f5bc506f9fcef1f4c7b34e596b06323bae0951c4fe354cc2b76489f6abcf1207439120a4bd3a6cf40174b139cda70f7a558a3f53d9bcdd3a9e74b81bf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-8a45c52f5bc506f9fcef1f4c7b34e596b06323bae0951c4fe354cc2b76489f6abcf1207439120a4bd3a6cf40174b139cda70f7a558a3f53d9bcdd3a9e74b81bf"' :
                                        'id="xs-injectables-links-module-PrismaModule-8a45c52f5bc506f9fcef1f4c7b34e596b06323bae0951c4fe354cc2b76489f6abcf1207439120a4bd3a6cf40174b139cda70f7a558a3f53d9bcdd3a9e74b81bf"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoomModule.html" data-type="entity-link" >RoomModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-RoomModule-6877ed9d0cd1b0b7db757b0e0ef439b18c923f2752398be5474da401d81d5d898596cd3f65d0675d16b87e11374a13a6233a2ed2aa6afe038fcf402366ce08e8"' : 'data-target="#xs-controllers-links-module-RoomModule-6877ed9d0cd1b0b7db757b0e0ef439b18c923f2752398be5474da401d81d5d898596cd3f65d0675d16b87e11374a13a6233a2ed2aa6afe038fcf402366ce08e8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoomModule-6877ed9d0cd1b0b7db757b0e0ef439b18c923f2752398be5474da401d81d5d898596cd3f65d0675d16b87e11374a13a6233a2ed2aa6afe038fcf402366ce08e8"' :
                                            'id="xs-controllers-links-module-RoomModule-6877ed9d0cd1b0b7db757b0e0ef439b18c923f2752398be5474da401d81d5d898596cd3f65d0675d16b87e11374a13a6233a2ed2aa6afe038fcf402366ce08e8"' }>
                                            <li class="link">
                                                <a href="controllers/RoomController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RoomModule-6877ed9d0cd1b0b7db757b0e0ef439b18c923f2752398be5474da401d81d5d898596cd3f65d0675d16b87e11374a13a6233a2ed2aa6afe038fcf402366ce08e8"' : 'data-target="#xs-injectables-links-module-RoomModule-6877ed9d0cd1b0b7db757b0e0ef439b18c923f2752398be5474da401d81d5d898596cd3f65d0675d16b87e11374a13a6233a2ed2aa6afe038fcf402366ce08e8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoomModule-6877ed9d0cd1b0b7db757b0e0ef439b18c923f2752398be5474da401d81d5d898596cd3f65d0675d16b87e11374a13a6233a2ed2aa6afe038fcf402366ce08e8"' :
                                        'id="xs-injectables-links-module-RoomModule-6877ed9d0cd1b0b7db757b0e0ef439b18c923f2752398be5474da401d81d5d898596cd3f65d0675d16b87e11374a13a6233a2ed2aa6afe038fcf402366ce08e8"' }>
                                        <li class="link">
                                            <a href="injectables/CardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoomService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-7b9027630fe76d048d2b82d28cfdff60214150e26bfb65a2b9fe45989a1cb46b32d0c7ff32356b20fcdbb54bb7511b0ba64b86a9d910f086827724a5ff6c333e"' : 'data-target="#xs-controllers-links-module-UsersModule-7b9027630fe76d048d2b82d28cfdff60214150e26bfb65a2b9fe45989a1cb46b32d0c7ff32356b20fcdbb54bb7511b0ba64b86a9d910f086827724a5ff6c333e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-7b9027630fe76d048d2b82d28cfdff60214150e26bfb65a2b9fe45989a1cb46b32d0c7ff32356b20fcdbb54bb7511b0ba64b86a9d910f086827724a5ff6c333e"' :
                                            'id="xs-controllers-links-module-UsersModule-7b9027630fe76d048d2b82d28cfdff60214150e26bfb65a2b9fe45989a1cb46b32d0c7ff32356b20fcdbb54bb7511b0ba64b86a9d910f086827724a5ff6c333e"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-7b9027630fe76d048d2b82d28cfdff60214150e26bfb65a2b9fe45989a1cb46b32d0c7ff32356b20fcdbb54bb7511b0ba64b86a9d910f086827724a5ff6c333e"' : 'data-target="#xs-injectables-links-module-UsersModule-7b9027630fe76d048d2b82d28cfdff60214150e26bfb65a2b9fe45989a1cb46b32d0c7ff32356b20fcdbb54bb7511b0ba64b86a9d910f086827724a5ff6c333e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-7b9027630fe76d048d2b82d28cfdff60214150e26bfb65a2b9fe45989a1cb46b32d0c7ff32356b20fcdbb54bb7511b0ba64b86a9d910f086827724a5ff6c333e"' :
                                        'id="xs-injectables-links-module-UsersModule-7b9027630fe76d048d2b82d28cfdff60214150e26bfb65a2b9fe45989a1cb46b32d0c7ff32356b20fcdbb54bb7511b0ba64b86a9d910f086827724a5ff6c333e"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CardController.html" data-type="entity-link" >CardController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RoomController.html" data-type="entity-link" >RoomController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Card.html" data-type="entity-link" >Card</a>
                            </li>
                            <li class="link">
                                <a href="classes/checkBingoDto.html" data-type="entity-link" >checkBingoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoomDto.html" data-type="entity-link" >CreateRoomDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginResponseDto.html" data-type="entity-link" >LoginResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Room.html" data-type="entity-link" >Room</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoomDto.html" data-type="entity-link" >UpdateRoomDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CardService.html" data-type="entity-link" >CardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoomService.html" data-type="entity-link" >RoomService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});