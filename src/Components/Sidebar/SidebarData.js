import React from 'react'
import * as FaIcons from 'react-icons/fa'

import { i18n } from '../Translates/i18n'

export const SidebarData = [
	{
		title: i18n.t('principal_td'),
		path: '/backoffice/bo',
		icon: <FaIcons.FaHome/>
	},
	{
		title: i18n.t('rede_td'),
		icon: <FaIcons.FaSitemap/>,
		iconClosed: <FaIcons.FaAngleDown/>,
		iconOpened: <FaIcons.FaAngleUp/>,
		subNav: [
			{
				title: i18n.t('direto_td'),
				path: '/backoffice/directs',
				icon: <FaIcons.FaChevronRight/>
			},
			{
				title: i18n.t('binario_td'),
				path: '/backoffice/binary',
				icon: <FaIcons.FaChevronRight/>
			},
			{
				title: i18n.t('linear_td'),
				path: '/backoffice/linear',
				icon: <FaIcons.FaChevronRight/>
			},
		]
	},
	{
		title: i18n.t('dados_td')+' '+i18n.t('pessoais_td'),
		icon: <FaIcons.FaUserCheck/>,
		iconClosed: <FaIcons.FaAngleDown/>,
		iconOpened: <FaIcons.FaAngleUp/>,
		subNav: [
			{
				title: i18n.t('pessoais_td'),
				path: '/backoffice/profile',
				icon: <FaIcons.FaChevronRight/>
			},
			{
				title: i18n.t('senha_td')+' '+i18n.t('de_td')+' '+i18n.t('acesso_td'),
				path: '/backoffice/password',
				icon: <FaIcons.FaChevronRight/>
			},
			{
				title: i18n.t('senha_td')+' '+i18n.t('financeiro_td'),
				path: '/backoffice/financepassword',
				icon: <FaIcons.FaChevronRight/>
			},
		]
	},
	{
		title: i18n.t('financeiro_td'),
		icon: <FaIcons.FaDollarSign/>,
		iconClosed: <FaIcons.FaAngleDown/>,
		iconOpened: <FaIcons.FaAngleUp/>,
		subNav: [
			{
				title: i18n.t('extrato_td'),
				path: '/backoffice/extract',
				icon: <FaIcons.FaChevronRight/>
			},
			{
				title: i18n.t('pedido_td'),
				path: '/backoffice/order',
				icon: <FaIcons.FaChevronRight/>
			},
			{
				title: i18n.t('pg_saldo'),
				path: '/backoffice/paywithbalance',
				icon: <FaIcons.FaChevronRight/>
			},
			{
				title: i18n.t('sacar_td')+' BTC',
				path: '/backoffice/withdrawalbtc',
				icon: <FaIcons.FaChevronRight/>
			},
			{
				title: i18n.t('update_td')+' '+i18n.t('carteira_td'),
				path: '/backoffice/updatewallet',
				icon: <FaIcons.FaChevronRight/>
			},
		]
	},
	{
		title: i18n.t('chamado'),
		path: '/backoffice/call',
		icon: <FaIcons.FaPhone/>
	},
	{
		title: i18n.t('materiais_td'),
		path: '/backoffice/materials',
		icon: <FaIcons.FaFileDownload/>
	},
	{
		title: i18n.t('sair_td'),
		path: '/backoffice/logout',
		icon: <FaIcons.FaSignOutAlt/>
	},
]
