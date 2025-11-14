import networksList_0 from "./networks/networksList";
import networksGet_1 from "./networks/networksGet";
import networksInsert_2 from "./networks/networksInsert";
import networksDelete_3 from "./networks/networksDelete";
import networksPatch_4 from "./networks/networksPatch";
import networksAddPeering_5 from "./networks/networksAddPeering";
import networksRemovePeering_6 from "./networks/networksRemovePeering";
import networksUpdatePeering_7 from "./networks/networksUpdatePeering";
import networksSwitchToCustomMode_8 from "./networks/networksSwitchToCustomMode";
import networksListPeeringRoutes_9 from "./networks/networksListPeeringRoutes";
import networksGetEffectiveFirewalls_10 from "./networks/networksGetEffectiveFirewalls";
import subnetworksList_11 from "./subnetworks/subnetworksList";
import subnetworksGet_12 from "./subnetworks/subnetworksGet";
import subnetworksInsert_13 from "./subnetworks/subnetworksInsert";
import subnetworksDelete_14 from "./subnetworks/subnetworksDelete";
import subnetworksPatch_15 from "./subnetworks/subnetworksPatch";
import subnetworksExpandIpCidrRange_16 from "./subnetworks/subnetworksExpandIpCidrRange";
import subnetworksSetPrivateIpGoogleAccess_17 from "./subnetworks/subnetworksSetPrivateIpGoogleAccess";
import subnetworksAggregatedList_18 from "./subnetworks/subnetworksAggregatedList";
import subnetworksGetIamPolicy_19 from "./subnetworks/subnetworksGetIamPolicy";
import subnetworksSetIamPolicy_20 from "./subnetworks/subnetworksSetIamPolicy";
import subnetworksTestIamPermissions_21 from "./subnetworks/subnetworksTestIamPermissions";
import subnetworksListUsable_22 from "./subnetworks/subnetworksListUsable";
import routesList_23 from "./routes/routesList";
import routesGet_24 from "./routes/routesGet";
import routesInsert_25 from "./routes/routesInsert";
import routesDelete_26 from "./routes/routesDelete";
import routersList_27 from "./routers/routersList";
import routersGet_28 from "./routers/routersGet";
import routersInsert_29 from "./routers/routersInsert";
import routersDelete_30 from "./routers/routersDelete";
import routersPatch_31 from "./routers/routersPatch";
import routersUpdate_32 from "./routers/routersUpdate";
import routersAggregatedList_33 from "./routers/routersAggregatedList";
import routersGetNatMappingInfo_34 from "./routers/routersGetNatMappingInfo";
import routersGetNatIpInfo_35 from "./routers/routersGetNatIpInfo";
import routersGetRouterStatus_36 from "./routers/routersGetRouterStatus";
import routersPreview_37 from "./routers/routersPreview";
import addressesList_38 from "./addresses/addressesList";
import addressesGet_39 from "./addresses/addressesGet";
import addressesInsert_40 from "./addresses/addressesInsert";
import addressesDelete_41 from "./addresses/addressesDelete";
import addressesAggregatedList_42 from "./addresses/addressesAggregatedList";
import addressesMove_43 from "./addresses/addressesMove";
import addressesSetLabels_44 from "./addresses/addressesSetLabels";
import globalAddressesList_45 from "./global_addresses/globalAddressesList";
import globalAddressesGet_46 from "./global_addresses/globalAddressesGet";
import globalAddressesInsert_47 from "./global_addresses/globalAddressesInsert";
import globalAddressesDelete_48 from "./global_addresses/globalAddressesDelete";
import globalAddressesMove_49 from "./global_addresses/globalAddressesMove";
import globalAddressesSetLabels_50 from "./global_addresses/globalAddressesSetLabels";
import publicDelegatedPrefixesList_51 from "./public_delegated_prefixes/publicDelegatedPrefixesList";
import publicDelegatedPrefixesGet_52 from "./public_delegated_prefixes/publicDelegatedPrefixesGet";
import publicDelegatedPrefixesInsert_53 from "./public_delegated_prefixes/publicDelegatedPrefixesInsert";
import publicDelegatedPrefixesDelete_54 from "./public_delegated_prefixes/publicDelegatedPrefixesDelete";
import publicDelegatedPrefixesPatch_55 from "./public_delegated_prefixes/publicDelegatedPrefixesPatch";
import publicDelegatedPrefixesAggregatedList_56 from "./public_delegated_prefixes/publicDelegatedPrefixesAggregatedList";
import publicDelegatedPrefixesAnnounce_57 from "./public_delegated_prefixes/publicDelegatedPrefixesAnnounce";
import publicDelegatedPrefixesWithdraw_58 from "./public_delegated_prefixes/publicDelegatedPrefixesWithdraw";
import globalPublicDelegatedPrefixesList_59 from "./global_public_delegated_prefixes/globalPublicDelegatedPrefixesList";
import globalPublicDelegatedPrefixesGet_60 from "./global_public_delegated_prefixes/globalPublicDelegatedPrefixesGet";
import globalPublicDelegatedPrefixesInsert_61 from "./global_public_delegated_prefixes/globalPublicDelegatedPrefixesInsert";
import globalPublicDelegatedPrefixesDelete_62 from "./global_public_delegated_prefixes/globalPublicDelegatedPrefixesDelete";
import globalPublicDelegatedPrefixesPatch_63 from "./global_public_delegated_prefixes/globalPublicDelegatedPrefixesPatch";
import externalVpnGatewaysList_64 from "./external_vpn_gateways/externalVpnGatewaysList";
import externalVpnGatewaysGet_65 from "./external_vpn_gateways/externalVpnGatewaysGet";
import externalVpnGatewaysInsert_66 from "./external_vpn_gateways/externalVpnGatewaysInsert";
import externalVpnGatewaysDelete_67 from "./external_vpn_gateways/externalVpnGatewaysDelete";
import externalVpnGatewaysSetLabels_68 from "./external_vpn_gateways/externalVpnGatewaysSetLabels";
import externalVpnGatewaysTestIamPermissions_69 from "./external_vpn_gateways/externalVpnGatewaysTestIamPermissions";
import vpnGatewaysList_70 from "./vpn_gateways/vpnGatewaysList";
import vpnGatewaysGet_71 from "./vpn_gateways/vpnGatewaysGet";
import vpnGatewaysInsert_72 from "./vpn_gateways/vpnGatewaysInsert";
import vpnGatewaysDelete_73 from "./vpn_gateways/vpnGatewaysDelete";
import vpnGatewaysAggregatedList_74 from "./vpn_gateways/vpnGatewaysAggregatedList";
import vpnGatewaysGetStatus_75 from "./vpn_gateways/vpnGatewaysGetStatus";
import vpnGatewaysSetLabels_76 from "./vpn_gateways/vpnGatewaysSetLabels";
import vpnGatewaysTestIamPermissions_77 from "./vpn_gateways/vpnGatewaysTestIamPermissions";
import vpnTunnelsList_78 from "./vpn_tunnels/vpnTunnelsList";
import vpnTunnelsGet_79 from "./vpn_tunnels/vpnTunnelsGet";
import vpnTunnelsInsert_80 from "./vpn_tunnels/vpnTunnelsInsert";
import vpnTunnelsDelete_81 from "./vpn_tunnels/vpnTunnelsDelete";
import vpnTunnelsAggregatedList_82 from "./vpn_tunnels/vpnTunnelsAggregatedList";
import vpnTunnelsSetLabels_83 from "./vpn_tunnels/vpnTunnelsSetLabels";
import interconnectsList_84 from "./interconnects/interconnectsList";
import interconnectsGet_85 from "./interconnects/interconnectsGet";
import interconnectsInsert_86 from "./interconnects/interconnectsInsert";
import interconnectsDelete_87 from "./interconnects/interconnectsDelete";
import interconnectsPatch_88 from "./interconnects/interconnectsPatch";
import interconnectsGetDiagnostics_89 from "./interconnects/interconnectsGetDiagnostics";
import interconnectsGetMacsecConfig_90 from "./interconnects/interconnectsGetMacsecConfig";
import interconnectsSetLabels_91 from "./interconnects/interconnectsSetLabels";
import interconnectAttachmentsList_92 from "./interconnect_attachments/interconnectAttachmentsList";
import interconnectAttachmentsGet_93 from "./interconnect_attachments/interconnectAttachmentsGet";
import interconnectAttachmentsInsert_94 from "./interconnect_attachments/interconnectAttachmentsInsert";
import interconnectAttachmentsDelete_95 from "./interconnect_attachments/interconnectAttachmentsDelete";
import interconnectAttachmentsPatch_96 from "./interconnect_attachments/interconnectAttachmentsPatch";
import interconnectAttachmentsAggregatedList_97 from "./interconnect_attachments/interconnectAttachmentsAggregatedList";
import interconnectAttachmentsSetLabels_98 from "./interconnect_attachments/interconnectAttachmentsSetLabels";
import packetMirroringsList_99 from "./packet_mirrorings/packetMirroringsList";
import packetMirroringsGet_100 from "./packet_mirrorings/packetMirroringsGet";
import packetMirroringsInsert_101 from "./packet_mirrorings/packetMirroringsInsert";
import packetMirroringsDelete_102 from "./packet_mirrorings/packetMirroringsDelete";
import packetMirroringsPatch_103 from "./packet_mirrorings/packetMirroringsPatch";
import packetMirroringsAggregatedList_104 from "./packet_mirrorings/packetMirroringsAggregatedList";
import packetMirroringsTestIamPermissions_105 from "./packet_mirrorings/packetMirroringsTestIamPermissions";

export const blocks = {
  networks_networksList: networksList_0,
  networks_networksGet: networksGet_1,
  networks_networksInsert: networksInsert_2,
  networks_networksDelete: networksDelete_3,
  networks_networksPatch: networksPatch_4,
  networks_networksAddPeering: networksAddPeering_5,
  networks_networksRemovePeering: networksRemovePeering_6,
  networks_networksUpdatePeering: networksUpdatePeering_7,
  networks_networksSwitchToCustomMode: networksSwitchToCustomMode_8,
  networks_networksListPeeringRoutes: networksListPeeringRoutes_9,
  networks_networksGetEffectiveFirewalls: networksGetEffectiveFirewalls_10,
  subnetworks_subnetworksList: subnetworksList_11,
  subnetworks_subnetworksGet: subnetworksGet_12,
  subnetworks_subnetworksInsert: subnetworksInsert_13,
  subnetworks_subnetworksDelete: subnetworksDelete_14,
  subnetworks_subnetworksPatch: subnetworksPatch_15,
  subnetworks_subnetworksExpandIpCidrRange: subnetworksExpandIpCidrRange_16,
  subnetworks_subnetworksSetPrivateIpGoogleAccess:
    subnetworksSetPrivateIpGoogleAccess_17,
  subnetworks_subnetworksAggregatedList: subnetworksAggregatedList_18,
  subnetworks_subnetworksGetIamPolicy: subnetworksGetIamPolicy_19,
  subnetworks_subnetworksSetIamPolicy: subnetworksSetIamPolicy_20,
  subnetworks_subnetworksTestIamPermissions: subnetworksTestIamPermissions_21,
  subnetworks_subnetworksListUsable: subnetworksListUsable_22,
  routes_routesList: routesList_23,
  routes_routesGet: routesGet_24,
  routes_routesInsert: routesInsert_25,
  routes_routesDelete: routesDelete_26,
  routers_routersList: routersList_27,
  routers_routersGet: routersGet_28,
  routers_routersInsert: routersInsert_29,
  routers_routersDelete: routersDelete_30,
  routers_routersPatch: routersPatch_31,
  routers_routersUpdate: routersUpdate_32,
  routers_routersAggregatedList: routersAggregatedList_33,
  routers_routersGetNatMappingInfo: routersGetNatMappingInfo_34,
  routers_routersGetNatIpInfo: routersGetNatIpInfo_35,
  routers_routersGetRouterStatus: routersGetRouterStatus_36,
  routers_routersPreview: routersPreview_37,
  addresses_addressesList: addressesList_38,
  addresses_addressesGet: addressesGet_39,
  addresses_addressesInsert: addressesInsert_40,
  addresses_addressesDelete: addressesDelete_41,
  addresses_addressesAggregatedList: addressesAggregatedList_42,
  addresses_addressesMove: addressesMove_43,
  addresses_addressesSetLabels: addressesSetLabels_44,
  global_addresses_globalAddressesList: globalAddressesList_45,
  global_addresses_globalAddressesGet: globalAddressesGet_46,
  global_addresses_globalAddressesInsert: globalAddressesInsert_47,
  global_addresses_globalAddressesDelete: globalAddressesDelete_48,
  global_addresses_globalAddressesMove: globalAddressesMove_49,
  global_addresses_globalAddressesSetLabels: globalAddressesSetLabels_50,
  public_delegated_prefixes_publicDelegatedPrefixesList:
    publicDelegatedPrefixesList_51,
  public_delegated_prefixes_publicDelegatedPrefixesGet:
    publicDelegatedPrefixesGet_52,
  public_delegated_prefixes_publicDelegatedPrefixesInsert:
    publicDelegatedPrefixesInsert_53,
  public_delegated_prefixes_publicDelegatedPrefixesDelete:
    publicDelegatedPrefixesDelete_54,
  public_delegated_prefixes_publicDelegatedPrefixesPatch:
    publicDelegatedPrefixesPatch_55,
  public_delegated_prefixes_publicDelegatedPrefixesAggregatedList:
    publicDelegatedPrefixesAggregatedList_56,
  public_delegated_prefixes_publicDelegatedPrefixesAnnounce:
    publicDelegatedPrefixesAnnounce_57,
  public_delegated_prefixes_publicDelegatedPrefixesWithdraw:
    publicDelegatedPrefixesWithdraw_58,
  global_public_delegated_prefixes_globalPublicDelegatedPrefixesList:
    globalPublicDelegatedPrefixesList_59,
  global_public_delegated_prefixes_globalPublicDelegatedPrefixesGet:
    globalPublicDelegatedPrefixesGet_60,
  global_public_delegated_prefixes_globalPublicDelegatedPrefixesInsert:
    globalPublicDelegatedPrefixesInsert_61,
  global_public_delegated_prefixes_globalPublicDelegatedPrefixesDelete:
    globalPublicDelegatedPrefixesDelete_62,
  global_public_delegated_prefixes_globalPublicDelegatedPrefixesPatch:
    globalPublicDelegatedPrefixesPatch_63,
  external_vpn_gateways_externalVpnGatewaysList: externalVpnGatewaysList_64,
  external_vpn_gateways_externalVpnGatewaysGet: externalVpnGatewaysGet_65,
  external_vpn_gateways_externalVpnGatewaysInsert: externalVpnGatewaysInsert_66,
  external_vpn_gateways_externalVpnGatewaysDelete: externalVpnGatewaysDelete_67,
  external_vpn_gateways_externalVpnGatewaysSetLabels:
    externalVpnGatewaysSetLabels_68,
  external_vpn_gateways_externalVpnGatewaysTestIamPermissions:
    externalVpnGatewaysTestIamPermissions_69,
  vpn_gateways_vpnGatewaysList: vpnGatewaysList_70,
  vpn_gateways_vpnGatewaysGet: vpnGatewaysGet_71,
  vpn_gateways_vpnGatewaysInsert: vpnGatewaysInsert_72,
  vpn_gateways_vpnGatewaysDelete: vpnGatewaysDelete_73,
  vpn_gateways_vpnGatewaysAggregatedList: vpnGatewaysAggregatedList_74,
  vpn_gateways_vpnGatewaysGetStatus: vpnGatewaysGetStatus_75,
  vpn_gateways_vpnGatewaysSetLabels: vpnGatewaysSetLabels_76,
  vpn_gateways_vpnGatewaysTestIamPermissions: vpnGatewaysTestIamPermissions_77,
  vpn_tunnels_vpnTunnelsList: vpnTunnelsList_78,
  vpn_tunnels_vpnTunnelsGet: vpnTunnelsGet_79,
  vpn_tunnels_vpnTunnelsInsert: vpnTunnelsInsert_80,
  vpn_tunnels_vpnTunnelsDelete: vpnTunnelsDelete_81,
  vpn_tunnels_vpnTunnelsAggregatedList: vpnTunnelsAggregatedList_82,
  vpn_tunnels_vpnTunnelsSetLabels: vpnTunnelsSetLabels_83,
  interconnects_interconnectsList: interconnectsList_84,
  interconnects_interconnectsGet: interconnectsGet_85,
  interconnects_interconnectsInsert: interconnectsInsert_86,
  interconnects_interconnectsDelete: interconnectsDelete_87,
  interconnects_interconnectsPatch: interconnectsPatch_88,
  interconnects_interconnectsGetDiagnostics: interconnectsGetDiagnostics_89,
  interconnects_interconnectsGetMacsecConfig: interconnectsGetMacsecConfig_90,
  interconnects_interconnectsSetLabels: interconnectsSetLabels_91,
  interconnect_attachments_interconnectAttachmentsList:
    interconnectAttachmentsList_92,
  interconnect_attachments_interconnectAttachmentsGet:
    interconnectAttachmentsGet_93,
  interconnect_attachments_interconnectAttachmentsInsert:
    interconnectAttachmentsInsert_94,
  interconnect_attachments_interconnectAttachmentsDelete:
    interconnectAttachmentsDelete_95,
  interconnect_attachments_interconnectAttachmentsPatch:
    interconnectAttachmentsPatch_96,
  interconnect_attachments_interconnectAttachmentsAggregatedList:
    interconnectAttachmentsAggregatedList_97,
  interconnect_attachments_interconnectAttachmentsSetLabels:
    interconnectAttachmentsSetLabels_98,
  packet_mirrorings_packetMirroringsList: packetMirroringsList_99,
  packet_mirrorings_packetMirroringsGet: packetMirroringsGet_100,
  packet_mirrorings_packetMirroringsInsert: packetMirroringsInsert_101,
  packet_mirrorings_packetMirroringsDelete: packetMirroringsDelete_102,
  packet_mirrorings_packetMirroringsPatch: packetMirroringsPatch_103,
  packet_mirrorings_packetMirroringsAggregatedList:
    packetMirroringsAggregatedList_104,
  packet_mirrorings_packetMirroringsTestIamPermissions:
    packetMirroringsTestIamPermissions_105,
};
