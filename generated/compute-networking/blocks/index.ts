import networksList from "./networks/networksList";
import networksGet from "./networks/networksGet";
import networksInsert from "./networks/networksInsert";
import networksDelete from "./networks/networksDelete";
import networksPatch from "./networks/networksPatch";
import networksAddPeering from "./networks/networksAddPeering";
import networksRemovePeering from "./networks/networksRemovePeering";
import networksUpdatePeering from "./networks/networksUpdatePeering";
import networksSwitchToCustomMode from "./networks/networksSwitchToCustomMode";
import networksListPeeringRoutes from "./networks/networksListPeeringRoutes";
import networksGetEffectiveFirewalls from "./networks/networksGetEffectiveFirewalls";
import subnetworksList from "./subnetworks/subnetworksList";
import subnetworksGet from "./subnetworks/subnetworksGet";
import subnetworksInsert from "./subnetworks/subnetworksInsert";
import subnetworksDelete from "./subnetworks/subnetworksDelete";
import subnetworksPatch from "./subnetworks/subnetworksPatch";
import subnetworksExpandIpCidrRange from "./subnetworks/subnetworksExpandIpCidrRange";
import subnetworksSetPrivateIpGoogleAccess from "./subnetworks/subnetworksSetPrivateIpGoogleAccess";
import subnetworksAggregatedList from "./subnetworks/subnetworksAggregatedList";
import subnetworksGetIamPolicy from "./subnetworks/subnetworksGetIamPolicy";
import subnetworksSetIamPolicy from "./subnetworks/subnetworksSetIamPolicy";
import subnetworksTestIamPermissions from "./subnetworks/subnetworksTestIamPermissions";
import subnetworksListUsable from "./subnetworks/subnetworksListUsable";
import routesList from "./routes/routesList";
import routesGet from "./routes/routesGet";
import routesInsert from "./routes/routesInsert";
import routesDelete from "./routes/routesDelete";
import routersList from "./routers/routersList";
import routersGet from "./routers/routersGet";
import routersInsert from "./routers/routersInsert";
import routersDelete from "./routers/routersDelete";
import routersPatch from "./routers/routersPatch";
import routersUpdate from "./routers/routersUpdate";
import routersAggregatedList from "./routers/routersAggregatedList";
import routersGetNatMappingInfo from "./routers/routersGetNatMappingInfo";
import routersGetNatIpInfo from "./routers/routersGetNatIpInfo";
import routersGetRouterStatus from "./routers/routersGetRouterStatus";
import routersPreview from "./routers/routersPreview";
import addressesList from "./addresses/addressesList";
import addressesGet from "./addresses/addressesGet";
import addressesInsert from "./addresses/addressesInsert";
import addressesDelete from "./addresses/addressesDelete";
import addressesAggregatedList from "./addresses/addressesAggregatedList";
import addressesMove from "./addresses/addressesMove";
import addressesSetLabels from "./addresses/addressesSetLabels";
import globalAddressesList from "./global_addresses/globalAddressesList";
import globalAddressesGet from "./global_addresses/globalAddressesGet";
import globalAddressesInsert from "./global_addresses/globalAddressesInsert";
import globalAddressesDelete from "./global_addresses/globalAddressesDelete";
import globalAddressesMove from "./global_addresses/globalAddressesMove";
import globalAddressesSetLabels from "./global_addresses/globalAddressesSetLabels";
import publicDelegatedPrefixesList from "./public_delegated_prefixes/publicDelegatedPrefixesList";
import publicDelegatedPrefixesGet from "./public_delegated_prefixes/publicDelegatedPrefixesGet";
import publicDelegatedPrefixesInsert from "./public_delegated_prefixes/publicDelegatedPrefixesInsert";
import publicDelegatedPrefixesDelete from "./public_delegated_prefixes/publicDelegatedPrefixesDelete";
import publicDelegatedPrefixesPatch from "./public_delegated_prefixes/publicDelegatedPrefixesPatch";
import publicDelegatedPrefixesAggregatedList from "./public_delegated_prefixes/publicDelegatedPrefixesAggregatedList";
import publicDelegatedPrefixesAnnounce from "./public_delegated_prefixes/publicDelegatedPrefixesAnnounce";
import publicDelegatedPrefixesWithdraw from "./public_delegated_prefixes/publicDelegatedPrefixesWithdraw";
import globalPublicDelegatedPrefixesList from "./global_public_delegated_prefixes/globalPublicDelegatedPrefixesList";
import globalPublicDelegatedPrefixesGet from "./global_public_delegated_prefixes/globalPublicDelegatedPrefixesGet";
import globalPublicDelegatedPrefixesInsert from "./global_public_delegated_prefixes/globalPublicDelegatedPrefixesInsert";
import globalPublicDelegatedPrefixesDelete from "./global_public_delegated_prefixes/globalPublicDelegatedPrefixesDelete";
import globalPublicDelegatedPrefixesPatch from "./global_public_delegated_prefixes/globalPublicDelegatedPrefixesPatch";
import externalVpnGatewaysList from "./external_vpn_gateways/externalVpnGatewaysList";
import externalVpnGatewaysGet from "./external_vpn_gateways/externalVpnGatewaysGet";
import externalVpnGatewaysInsert from "./external_vpn_gateways/externalVpnGatewaysInsert";
import externalVpnGatewaysDelete from "./external_vpn_gateways/externalVpnGatewaysDelete";
import externalVpnGatewaysSetLabels from "./external_vpn_gateways/externalVpnGatewaysSetLabels";
import externalVpnGatewaysTestIamPermissions from "./external_vpn_gateways/externalVpnGatewaysTestIamPermissions";
import vpnGatewaysList from "./vpn_gateways/vpnGatewaysList";
import vpnGatewaysGet from "./vpn_gateways/vpnGatewaysGet";
import vpnGatewaysInsert from "./vpn_gateways/vpnGatewaysInsert";
import vpnGatewaysDelete from "./vpn_gateways/vpnGatewaysDelete";
import vpnGatewaysAggregatedList from "./vpn_gateways/vpnGatewaysAggregatedList";
import vpnGatewaysGetStatus from "./vpn_gateways/vpnGatewaysGetStatus";
import vpnGatewaysSetLabels from "./vpn_gateways/vpnGatewaysSetLabels";
import vpnGatewaysTestIamPermissions from "./vpn_gateways/vpnGatewaysTestIamPermissions";
import vpnTunnelsList from "./vpn_tunnels/vpnTunnelsList";
import vpnTunnelsGet from "./vpn_tunnels/vpnTunnelsGet";
import vpnTunnelsInsert from "./vpn_tunnels/vpnTunnelsInsert";
import vpnTunnelsDelete from "./vpn_tunnels/vpnTunnelsDelete";
import vpnTunnelsAggregatedList from "./vpn_tunnels/vpnTunnelsAggregatedList";
import vpnTunnelsSetLabels from "./vpn_tunnels/vpnTunnelsSetLabels";
import interconnectsList from "./interconnects/interconnectsList";
import interconnectsGet from "./interconnects/interconnectsGet";
import interconnectsInsert from "./interconnects/interconnectsInsert";
import interconnectsDelete from "./interconnects/interconnectsDelete";
import interconnectsPatch from "./interconnects/interconnectsPatch";
import interconnectsGetDiagnostics from "./interconnects/interconnectsGetDiagnostics";
import interconnectsGetMacsecConfig from "./interconnects/interconnectsGetMacsecConfig";
import interconnectsSetLabels from "./interconnects/interconnectsSetLabels";
import interconnectAttachmentsList from "./interconnect_attachments/interconnectAttachmentsList";
import interconnectAttachmentsGet from "./interconnect_attachments/interconnectAttachmentsGet";
import interconnectAttachmentsInsert from "./interconnect_attachments/interconnectAttachmentsInsert";
import interconnectAttachmentsDelete from "./interconnect_attachments/interconnectAttachmentsDelete";
import interconnectAttachmentsPatch from "./interconnect_attachments/interconnectAttachmentsPatch";
import interconnectAttachmentsAggregatedList from "./interconnect_attachments/interconnectAttachmentsAggregatedList";
import interconnectAttachmentsSetLabels from "./interconnect_attachments/interconnectAttachmentsSetLabels";
import packetMirroringsList from "./packet_mirrorings/packetMirroringsList";
import packetMirroringsGet from "./packet_mirrorings/packetMirroringsGet";
import packetMirroringsInsert from "./packet_mirrorings/packetMirroringsInsert";
import packetMirroringsDelete from "./packet_mirrorings/packetMirroringsDelete";
import packetMirroringsPatch from "./packet_mirrorings/packetMirroringsPatch";
import packetMirroringsAggregatedList from "./packet_mirrorings/packetMirroringsAggregatedList";
import packetMirroringsTestIamPermissions from "./packet_mirrorings/packetMirroringsTestIamPermissions";

export const blocks = {
  networksList,
  networksGet,
  networksInsert,
  networksDelete,
  networksPatch,
  networksAddPeering,
  networksRemovePeering,
  networksUpdatePeering,
  networksSwitchToCustomMode,
  networksListPeeringRoutes,
  networksGetEffectiveFirewalls,
  subnetworksList,
  subnetworksGet,
  subnetworksInsert,
  subnetworksDelete,
  subnetworksPatch,
  subnetworksExpandIpCidrRange,
  subnetworksSetPrivateIpGoogleAccess,
  subnetworksAggregatedList,
  subnetworksGetIamPolicy,
  subnetworksSetIamPolicy,
  subnetworksTestIamPermissions,
  subnetworksListUsable,
  routesList,
  routesGet,
  routesInsert,
  routesDelete,
  routersList,
  routersGet,
  routersInsert,
  routersDelete,
  routersPatch,
  routersUpdate,
  routersAggregatedList,
  routersGetNatMappingInfo,
  routersGetNatIpInfo,
  routersGetRouterStatus,
  routersPreview,
  addressesList,
  addressesGet,
  addressesInsert,
  addressesDelete,
  addressesAggregatedList,
  addressesMove,
  addressesSetLabels,
  globalAddressesList,
  globalAddressesGet,
  globalAddressesInsert,
  globalAddressesDelete,
  globalAddressesMove,
  globalAddressesSetLabels,
  publicDelegatedPrefixesList,
  publicDelegatedPrefixesGet,
  publicDelegatedPrefixesInsert,
  publicDelegatedPrefixesDelete,
  publicDelegatedPrefixesPatch,
  publicDelegatedPrefixesAggregatedList,
  publicDelegatedPrefixesAnnounce,
  publicDelegatedPrefixesWithdraw,
  globalPublicDelegatedPrefixesList,
  globalPublicDelegatedPrefixesGet,
  globalPublicDelegatedPrefixesInsert,
  globalPublicDelegatedPrefixesDelete,
  globalPublicDelegatedPrefixesPatch,
  externalVpnGatewaysList,
  externalVpnGatewaysGet,
  externalVpnGatewaysInsert,
  externalVpnGatewaysDelete,
  externalVpnGatewaysSetLabels,
  externalVpnGatewaysTestIamPermissions,
  vpnGatewaysList,
  vpnGatewaysGet,
  vpnGatewaysInsert,
  vpnGatewaysDelete,
  vpnGatewaysAggregatedList,
  vpnGatewaysGetStatus,
  vpnGatewaysSetLabels,
  vpnGatewaysTestIamPermissions,
  vpnTunnelsList,
  vpnTunnelsGet,
  vpnTunnelsInsert,
  vpnTunnelsDelete,
  vpnTunnelsAggregatedList,
  vpnTunnelsSetLabels,
  interconnectsList,
  interconnectsGet,
  interconnectsInsert,
  interconnectsDelete,
  interconnectsPatch,
  interconnectsGetDiagnostics,
  interconnectsGetMacsecConfig,
  interconnectsSetLabels,
  interconnectAttachmentsList,
  interconnectAttachmentsGet,
  interconnectAttachmentsInsert,
  interconnectAttachmentsDelete,
  interconnectAttachmentsPatch,
  interconnectAttachmentsAggregatedList,
  interconnectAttachmentsSetLabels,
  packetMirroringsList,
  packetMirroringsGet,
  packetMirroringsInsert,
  packetMirroringsDelete,
  packetMirroringsPatch,
  packetMirroringsAggregatedList,
  packetMirroringsTestIamPermissions,
};
