/* istanbul ignore file */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  DateTime: { input: string; output: string; }
  JSONString: { input: string; output: string; }
  PointScalar: { input: any; output: any; }
  PositiveInt: { input: number; output: number; }
  UUID: { input: string; output: string; }
  _Any: { input: any; output: any; }
};

export type ActionAttributeUpdateInput = {
  /** ID (PK or identifier) of the attribute type */
  attributeTypeId: Scalars['ID']['input'];
  value: ActionAttributeValueInput;
};

/** Value for an attribute (choose one based on attribute type format) */
export type ActionAttributeValueInput = {
  /** Category choice values (pks) for an attribute */
  categoryChoices: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Choice value (pk + optional rich text explanation) for an attribute */
  choice: InputMaybe<AttributeValueChoiceInput>;
  /** HTML rich text value for an attribute */
  richText: InputMaybe<Scalars['String']['input']>;
  /** Plain text value for an attribute */
  text: InputMaybe<Scalars['String']['input']>;
};

/** An enumeration. */
export enum ActionContactPersonRole {
  /** Editor */
  Editor = 'EDITOR',
  /** Moderator */
  Moderator = 'MODERATOR'
}

/** An enumeration. */
export enum ActionDashboardFieldName {
  Attribute = 'ATTRIBUTE',
  EndDate = 'END_DATE',
  Identifier = 'IDENTIFIER',
  ImplementationPhase = 'IMPLEMENTATION_PHASE',
  Name = 'NAME',
  PrimaryOrg = 'PRIMARY_ORG',
  RelatedIndicators = 'RELATED_INDICATORS',
  ResponsibleParties = 'RESPONSIBLE_PARTIES',
  ScheduleContinuous = 'SCHEDULE_CONTINUOUS',
  StartDate = 'START_DATE',
  Status = 'STATUS',
  Tasks = 'TASKS',
  UpdatedAt = 'UPDATED_AT'
}

/** An enumeration. */
export enum ActionDateFormat {
  /** Day, month and year (31.12.2020) */
  Full = 'FULL',
  /** Month and year (12.2020) */
  MonthYear = 'MONTH_YEAR',
  /** Year (2020) */
  Year = 'YEAR'
}

/** An enumeration. */
export enum ActionIndicatorEffectType {
  /** decreases */
  Decreases = 'DECREASES',
  /** increases */
  Increases = 'INCREASES'
}

/** One action/measure tracked in an action plan. */
export type ActionInput = {
  attributeValues: InputMaybe<Array<ActionAttributeUpdateInput>>;
  categoryIds: InputMaybe<Array<Scalars['ID']['input']>>;
  /** What does this action involve in more detail? */
  description: InputMaybe<Scalars['String']['input']>;
  /** The identifier for this action (e.g. number) */
  identifier: Scalars['ID']['input'];
  leadParagraph: InputMaybe<Scalars['String']['input']>;
  links: InputMaybe<Array<ActionLinkInput>>;
  name: Scalars['String']['input'];
  planId: Scalars['ID']['input'];
  primaryOrgId: InputMaybe<Scalars['ID']['input']>;
  responsibleParties: InputMaybe<Array<ActionResponsiblePartyInput>>;
};

/** Link to associate with an action */
export type ActionLinkInput = {
  /** Display title for the link */
  title: Scalars['String']['input'];
  /** URL of the link */
  url: Scalars['String']['input'];
};

export enum ActionListPageView {
  Cards = 'CARDS',
  Dashboard = 'DASHBOARD'
}

/** An enumeration. */
export enum ActionList_FiltersFieldName {
  Attribute = 'ATTRIBUTE',
  Categories = 'CATEGORIES',
  ContactPersons = 'CONTACT_PERSONS',
  Dependencies = 'DEPENDENCIES',
  Description = 'DESCRIPTION',
  EndDate = 'END_DATE',
  Identifier = 'IDENTIFIER',
  ImplementationPhase = 'IMPLEMENTATION_PHASE',
  LeadParagraph = 'LEAD_PARAGRAPH',
  Links = 'LINKS',
  ManualStatusReason = 'MANUAL_STATUS_REASON',
  MergedActions = 'MERGED_ACTIONS',
  Name = 'NAME',
  OfficialName = 'OFFICIAL_NAME',
  Pledges = 'PLEDGES',
  PrimaryOrg = 'PRIMARY_ORG',
  RelatedActions = 'RELATED_ACTIONS',
  RelatedIndicators = 'RELATED_INDICATORS',
  ResponsibleParties = 'RESPONSIBLE_PARTIES',
  Schedule = 'SCHEDULE',
  ScheduleContinuous = 'SCHEDULE_CONTINUOUS',
  StartDate = 'START_DATE',
  Status = 'STATUS',
  Tasks = 'TASKS',
  UpdatedAt = 'UPDATED_AT'
}

/** Responsible party assignment for an action */
export type ActionResponsiblePartyInput = {
  /** ID of the organization */
  organizationId: Scalars['ID']['input'];
  /** Role of this organization in implementing the action. */
  role: InputMaybe<ActionResponsiblePartyRole>;
};

/** Role of an organization in implementing an action */
export enum ActionResponsiblePartyRole {
  Collaborator = 'COLLABORATOR',
  Primary = 'PRIMARY'
}

/** An enumeration. */
export enum ActionStatusSummaryIdentifier {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Late = 'LATE',
  Merged = 'MERGED',
  NotStarted = 'NOT_STARTED',
  OnTime = 'ON_TIME',
  OutOfScope = 'OUT_OF_SCOPE',
  Postponed = 'POSTPONED',
  Undefined = 'UNDEFINED'
}

/** An enumeration. */
export enum ActionTaskDateFormat {
  /** Day, month and year (31.12.2020) */
  Full = 'FULL',
  /** Month and year (12.2020) */
  MonthYear = 'MONTH_YEAR',
  /** Year (2020) */
  Year = 'YEAR'
}

/** An enumeration. */
export enum ActionTaskState {
  /** cancelled */
  Cancelled = 'CANCELLED',
  /** completed */
  Completed = 'COMPLETED',
  /** in progress */
  InProgress = 'IN_PROGRESS',
  /** not started */
  NotStarted = 'NOT_STARTED'
}

/** An enumeration. */
export enum ActionTimelinessIdentifier {
  Acceptable = 'ACCEPTABLE',
  Late = 'LATE',
  Optimal = 'OPTIMAL',
  Stale = 'STALE'
}

/** Update input for a single action in a bulk update */
export type ActionUpdateInput = {
  attributeValues: InputMaybe<Array<ActionAttributeUpdateInput>>;
  categoryIds: InputMaybe<Array<Scalars['ID']['input']>>;
  /** What does this action involve in more detail? */
  description: InputMaybe<Scalars['String']['input']>;
  /** The action ID (pk) */
  id: Scalars['ID']['input'];
  /** The identifier for this action (e.g. number) */
  identifier: InputMaybe<Scalars['ID']['input']>;
  leadParagraph: InputMaybe<Scalars['String']['input']>;
  links: InputMaybe<Array<ActionLinkInput>>;
  name: InputMaybe<Scalars['String']['input']>;
  primaryOrgId: InputMaybe<Scalars['ID']['input']>;
  responsibleParties: InputMaybe<Array<ActionResponsiblePartyInput>>;
};

/** An enumeration. */
export enum ActionVisibility {
  /** Internal */
  Internal = 'INTERNAL',
  /** Public */
  Public = 'PUBLIC'
}

export type AddRelatedOrganizationInput = {
  /** The PK of the organization */
  organizationId: Scalars['ID']['input'];
  /** The PK or identifier of the plan */
  planId: Scalars['ID']['input'];
};

/** An enumeration. */
export enum AttributeTypeFormat {
  /** Category */
  CategoryChoice = 'CATEGORY_CHOICE',
  /** Numeric */
  Numeric = 'NUMERIC',
  /** Optional choice with optional text */
  OptionalChoice = 'OPTIONAL_CHOICE',
  /** Ordered choice */
  OrderedChoice = 'ORDERED_CHOICE',
  /** Rich text */
  RichText = 'RICH_TEXT',
  /** Text */
  Text = 'TEXT',
  /** Choice */
  UnorderedChoice = 'UNORDERED_CHOICE'
}

/** Input type for creating a new attribute type */
export type AttributeTypeInput = {
  choiceOptions: InputMaybe<Array<ChoiceOptionInput>>;
  /** The format of the fields with this type */
  format: AttributeTypeFormat;
  /** A help text shown to visitors of the site */
  helpText: InputMaybe<Scalars['String']['input']>;
  identifier: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  planId: Scalars['ID']['input'];
  unitId: InputMaybe<Scalars['ID']['input']>;
};

export type AttributeValueChoiceInput = {
  choiceId: InputMaybe<Scalars['ID']['input']>;
  text: InputMaybe<Scalars['String']['input']>;
};

/** An enumeration. */
export enum CartographyProviderCredentialsProvider {
  /** MapBox */
  Mapbox = 'MAPBOX'
}

/** Input type for creating a new category */
export type CategoryInput = {
  identifier: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  order: InputMaybe<Scalars['Int']['input']>;
  parentId: InputMaybe<Scalars['ID']['input']>;
  typeId: Scalars['ID']['input'];
};

/**
 * Type of the categories.
 *
 * Is used to group categories together. One action plan can have several
 * category types.
 */
export type CategoryTypeInput = {
  /** Set if the categories do not have meaningful identifiers */
  hideCategoryIdentifiers: InputMaybe<Scalars['Boolean']['input']>;
  identifier: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  planId: Scalars['ID']['input'];
  /** Whether this category type is the primary action classification. NOTE: A Plan must have exactly one primary action classification. */
  primaryActionClassification: Scalars['Boolean']['input'];
  /** Choose "Multiple" only if more than one category can be selected at a time, otherwise choose "Single" which is the default. */
  selectWidget: InputMaybe<CategoryTypeSelectWidget>;
  /** Should a content page hierarchy be automatically generated for the categories. If not set, defaults to the value of `primaryActionClassification`. */
  synchronizeWithPages: InputMaybe<Scalars['Boolean']['input']>;
  usableForActions: InputMaybe<Scalars['Boolean']['input']>;
  usableForIndicators: InputMaybe<Scalars['Boolean']['input']>;
};

/** An enumeration. */
export enum CategoryTypeSelectWidget {
  /** Multiple */
  Multiple = 'MULTIPLE',
  /** Single */
  Single = 'SINGLE'
}

export type ChoiceOptionInput = {
  identifier: Scalars['String']['input'];
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};

/** An enumeration. */
export enum Comparison {
  Gt = 'GT',
  Lte = 'LTE'
}

export enum IndicatorCategoryRelationshipType {
  MainGoal = 'MAIN_GOAL',
  SecondaryGoal = 'SECONDARY_GOAL'
}

/** An enumeration. */
export enum IndicatorColumnValueType {
  Earliest = 'EARLIEST',
  Goal = 'GOAL',
  Latest = 'LATEST',
  Reference = 'REFERENCE'
}

/** An enumeration. */
export enum IndicatorDashboardFieldName {
  CausalityNav = 'CAUSALITY_NAV',
  ConnectedActions = 'CONNECTED_ACTIONS',
  Description = 'DESCRIPTION',
  Level = 'LEVEL',
  Name = 'NAME',
  Organization = 'ORGANIZATION',
  Reference = 'REFERENCE',
  Unit = 'UNIT',
  UpdatedAt = 'UPDATED_AT',
  ValueSummary = 'VALUE_SUMMARY',
  Visualization = 'VISUALIZATION'
}

/** An enumeration. */
export enum IndicatorDesiredTrend {
  /** attempt to detect automatically */
  A = 'A_',
  /** decreasing */
  Decreasing = 'DECREASING',
  /** increasing */
  Increasing = 'INCREASING'
}

/** An enumeration. */
export enum IndicatorDetailsFieldName {
  CausalityNav = 'CAUSALITY_NAV',
  ConnectedActions = 'CONNECTED_ACTIONS',
  Description = 'DESCRIPTION',
  FactorValueSummary = 'FACTOR_VALUE_SUMMARY',
  GoalDescription = 'GOAL_DESCRIPTION',
  Level = 'LEVEL',
  Name = 'NAME',
  Organization = 'ORGANIZATION',
  Reference = 'REFERENCE',
  Unit = 'UNIT',
  UpdatedAt = 'UPDATED_AT',
  ValueSummary = 'VALUE_SUMMARY',
  Visualization = 'VISUALIZATION'
}

/** An enumeration. */
export enum IndicatorLevelLevel {
  /** operational */
  Operational = 'OPERATIONAL',
  /** strategic */
  Strategic = 'STRATEGIC',
  /** tactical */
  Tactical = 'TACTICAL',
  /** unspecified */
  Unspecified = 'UNSPECIFIED'
}

/** An enumeration. */
export enum IndicatorList_FiltersFieldName {
  Description = 'DESCRIPTION',
  Level = 'LEVEL',
  Name = 'NAME',
  Organization = 'ORGANIZATION',
  Reference = 'REFERENCE',
  Unit = 'UNIT',
  UpdatedAt = 'UPDATED_AT'
}

/** An enumeration. */
export enum IndicatorNonQuantifiedGoal {
  /** Decrease */
  Decrease = 'DECREASE',
  /** Increase */
  Increase = 'INCREASE'
}

/** An enumeration. */
export enum IndicatorTimeResolution {
  /** day */
  Day = 'DAY',
  /** month */
  Month = 'MONTH',
  /** year */
  Year = 'YEAR'
}

export type InstanceContext = {
  hostname: InputMaybe<Scalars['String']['input']>;
  identifier: InputMaybe<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
};

export enum ModelAction {
  Add = 'ADD',
  Change = 'CHANGE',
  Delete = 'DELETE',
  View = 'VIEW'
}

export enum OperationMessageKind {
  Error = 'ERROR',
  Info = 'INFO',
  Permission = 'PERMISSION',
  Validation = 'VALIDATION',
  Warning = 'WARNING'
}

export type OrganizationInput = {
  /** Short abbreviation (e.g. "NASA", "YM") */
  abbreviation: InputMaybe<Scalars['String']['input']>;
  /** The official name of the organization */
  name: Scalars['String']['input'];
  /** ID of the parent organization; omit for a root organization */
  parentId: InputMaybe<Scalars['ID']['input']>;
  /** Primary language code (ISO 639-1, e.g. "en-US", "fi", "de-CH"). */
  primaryLanguage: Scalars['String']['input'];
};

/** An enumeration. */
export enum PlanCountry {
  /** Andorra */
  Ad = 'AD',
  /** United Arab Emirates */
  Ae = 'AE',
  /** Afghanistan */
  Af = 'AF',
  /** Antigua and Barbuda */
  Ag = 'AG',
  /** Anguilla */
  Ai = 'AI',
  /** Albania */
  Al = 'AL',
  /** Armenia */
  Am = 'AM',
  /** Angola */
  Ao = 'AO',
  /** Antarctica */
  Aq = 'AQ',
  /** Argentina */
  Ar = 'AR',
  /** American Samoa */
  As = 'AS',
  /** Austria */
  At = 'AT',
  /** Australia */
  Au = 'AU',
  /** Aruba */
  Aw = 'AW',
  /** Åland Islands */
  Ax = 'AX',
  /** Azerbaijan */
  Az = 'AZ',
  /** Bosnia and Herzegovina */
  Ba = 'BA',
  /** Barbados */
  Bb = 'BB',
  /** Bangladesh */
  Bd = 'BD',
  /** Belgium */
  Be = 'BE',
  /** Burkina Faso */
  Bf = 'BF',
  /** Bulgaria */
  Bg = 'BG',
  /** Bahrain */
  Bh = 'BH',
  /** Burundi */
  Bi = 'BI',
  /** Benin */
  Bj = 'BJ',
  /** Saint Barthélemy */
  Bl = 'BL',
  /** Bermuda */
  Bm = 'BM',
  /** Brunei */
  Bn = 'BN',
  /** Bolivia */
  Bo = 'BO',
  /** Bonaire, Sint Eustatius and Saba */
  Bq = 'BQ',
  /** Brazil */
  Br = 'BR',
  /** Bahamas (The) */
  Bs = 'BS',
  /** Bhutan */
  Bt = 'BT',
  /** Bouvet Island */
  Bv = 'BV',
  /** Botswana */
  Bw = 'BW',
  /** Belarus */
  By = 'BY',
  /** Belize */
  Bz = 'BZ',
  /** Canada */
  Ca = 'CA',
  /** Cocos (Keeling) Islands */
  Cc = 'CC',
  /** Democratic Republic of the Congo */
  Cd = 'CD',
  /** Central African Republic */
  Cf = 'CF',
  /** Congo */
  Cg = 'CG',
  /** Switzerland */
  Ch = 'CH',
  /** Côte d'Ivoire */
  Ci = 'CI',
  /** Cook Islands */
  Ck = 'CK',
  /** Chile */
  Cl = 'CL',
  /** Cameroon */
  Cm = 'CM',
  /** China */
  Cn = 'CN',
  /** Colombia */
  Co = 'CO',
  /** Costa Rica */
  Cr = 'CR',
  /** Cuba */
  Cu = 'CU',
  /** Cabo Verde */
  Cv = 'CV',
  /** Curaçao */
  Cw = 'CW',
  /** Christmas Island */
  Cx = 'CX',
  /** Cyprus */
  Cy = 'CY',
  /** Czechia */
  Cz = 'CZ',
  /** Germany */
  De = 'DE',
  /** Djibouti */
  Dj = 'DJ',
  /** Denmark */
  Dk = 'DK',
  /** Dominica */
  Dm = 'DM',
  /** Dominican Republic */
  Do = 'DO',
  /** Algeria */
  Dz = 'DZ',
  /** Ecuador */
  Ec = 'EC',
  /** Estonia */
  Ee = 'EE',
  /** Egypt */
  Eg = 'EG',
  /** Western Sahara */
  Eh = 'EH',
  /** Eritrea */
  Er = 'ER',
  /** Spain */
  Es = 'ES',
  /** Ethiopia */
  Et = 'ET',
  /** Finland */
  Fi = 'FI',
  /** Fiji */
  Fj = 'FJ',
  /** Falkland Islands (Malvinas) */
  Fk = 'FK',
  /** Micronesia */
  Fm = 'FM',
  /** Faroe Islands */
  Fo = 'FO',
  /** France */
  Fr = 'FR',
  /** Gabon */
  Ga = 'GA',
  /** United Kingdom */
  Gb = 'GB',
  /** Grenada */
  Gd = 'GD',
  /** Georgia */
  Ge = 'GE',
  /** French Guiana */
  Gf = 'GF',
  /** Guernsey */
  Gg = 'GG',
  /** Ghana */
  Gh = 'GH',
  /** Gibraltar */
  Gi = 'GI',
  /** Greenland */
  Gl = 'GL',
  /** Gambia */
  Gm = 'GM',
  /** Guinea */
  Gn = 'GN',
  /** Guadeloupe */
  Gp = 'GP',
  /** Equatorial Guinea */
  Gq = 'GQ',
  /** Greece */
  Gr = 'GR',
  /** South Georgia */
  Gs = 'GS',
  /** Guatemala */
  Gt = 'GT',
  /** Guam */
  Gu = 'GU',
  /** Guinea-Bissau */
  Gw = 'GW',
  /** Guyana */
  Gy = 'GY',
  /** Hong Kong */
  Hk = 'HK',
  /** Heard Island and McDonald Islands */
  Hm = 'HM',
  /** Honduras */
  Hn = 'HN',
  /** Croatia */
  Hr = 'HR',
  /** Haiti */
  Ht = 'HT',
  /** Hungary */
  Hu = 'HU',
  /** Indonesia */
  Id = 'ID',
  /** Ireland */
  Ie = 'IE',
  /** Israel */
  Il = 'IL',
  /** Isle of Man */
  Im = 'IM',
  /** India */
  In = 'IN',
  /** British Indian Ocean Territory */
  Io = 'IO',
  /** Iraq */
  Iq = 'IQ',
  /** Iran */
  Ir = 'IR',
  /** Iceland */
  Is = 'IS',
  /** Italy */
  It = 'IT',
  /** Jersey */
  Je = 'JE',
  /** Jamaica */
  Jm = 'JM',
  /** Jordan */
  Jo = 'JO',
  /** Japan */
  Jp = 'JP',
  /** Kenya */
  Ke = 'KE',
  /** Kyrgyzstan */
  Kg = 'KG',
  /** Cambodia */
  Kh = 'KH',
  /** Kiribati */
  Ki = 'KI',
  /** Comoros */
  Km = 'KM',
  /** Saint Kitts and Nevis */
  Kn = 'KN',
  /** North Korea */
  Kp = 'KP',
  /** South Korea */
  Kr = 'KR',
  /** Kuwait */
  Kw = 'KW',
  /** Cayman Islands */
  Ky = 'KY',
  /** Kazakhstan */
  Kz = 'KZ',
  /** Laos */
  La = 'LA',
  /** Lebanon */
  Lb = 'LB',
  /** Saint Lucia */
  Lc = 'LC',
  /** Liechtenstein */
  Li = 'LI',
  /** Sri Lanka */
  Lk = 'LK',
  /** Liberia */
  Lr = 'LR',
  /** Lesotho */
  Ls = 'LS',
  /** Lithuania */
  Lt = 'LT',
  /** Luxembourg */
  Lu = 'LU',
  /** Latvia */
  Lv = 'LV',
  /** Libya */
  Ly = 'LY',
  /** Morocco */
  Ma = 'MA',
  /** Monaco */
  Mc = 'MC',
  /** Moldova */
  Md = 'MD',
  /** Montenegro */
  Me = 'ME',
  /** Saint Martin (French part) */
  Mf = 'MF',
  /** Madagascar */
  Mg = 'MG',
  /** Marshall Islands */
  Mh = 'MH',
  /** North Macedonia */
  Mk = 'MK',
  /** Mali */
  Ml = 'ML',
  /** Myanmar */
  Mm = 'MM',
  /** Mongolia */
  Mn = 'MN',
  /** Macao */
  Mo = 'MO',
  /** Northern Mariana Islands */
  Mp = 'MP',
  /** Martinique */
  Mq = 'MQ',
  /** Mauritania */
  Mr = 'MR',
  /** Montserrat */
  Ms = 'MS',
  /** Malta */
  Mt = 'MT',
  /** Mauritius */
  Mu = 'MU',
  /** Maldives */
  Mv = 'MV',
  /** Malawi */
  Mw = 'MW',
  /** Mexico */
  Mx = 'MX',
  /** Malaysia */
  My = 'MY',
  /** Mozambique */
  Mz = 'MZ',
  /** Namibia */
  Na = 'NA',
  /** New Caledonia */
  Nc = 'NC',
  /** Niger */
  Ne = 'NE',
  /** Norfolk Island */
  Nf = 'NF',
  /** Nigeria */
  Ng = 'NG',
  /** Nicaragua */
  Ni = 'NI',
  /** Netherlands */
  Nl = 'NL',
  /** Norway */
  No = 'NO',
  /** Nepal */
  Np = 'NP',
  /** Nauru */
  Nr = 'NR',
  /** Niue */
  Nu = 'NU',
  /** New Zealand */
  Nz = 'NZ',
  /** Oman */
  Om = 'OM',
  /** Panama */
  Pa = 'PA',
  /** Peru */
  Pe = 'PE',
  /** French Polynesia */
  Pf = 'PF',
  /** Papua New Guinea */
  Pg = 'PG',
  /** Philippines */
  Ph = 'PH',
  /** Pakistan */
  Pk = 'PK',
  /** Poland */
  Pl = 'PL',
  /** Saint Pierre and Miquelon */
  Pm = 'PM',
  /** Pitcairn */
  Pn = 'PN',
  /** Puerto Rico */
  Pr = 'PR',
  /** Palestine */
  Ps = 'PS',
  /** Portugal */
  Pt = 'PT',
  /** Palau */
  Pw = 'PW',
  /** Paraguay */
  Py = 'PY',
  /** Qatar */
  Qa = 'QA',
  /** Réunion */
  Re = 'RE',
  /** Romania */
  Ro = 'RO',
  /** Serbia */
  Rs = 'RS',
  /** Russia */
  Ru = 'RU',
  /** Rwanda */
  Rw = 'RW',
  /** Saudi Arabia */
  Sa = 'SA',
  /** Solomon Islands */
  Sb = 'SB',
  /** Seychelles */
  Sc = 'SC',
  /** Sudan */
  Sd = 'SD',
  /** Sweden */
  Se = 'SE',
  /** Singapore */
  Sg = 'SG',
  /** Saint Helena */
  Sh = 'SH',
  /** Slovenia */
  Si = 'SI',
  /** Svalbard and Jan Mayen */
  Sj = 'SJ',
  /** Slovakia */
  Sk = 'SK',
  /** Sierra Leone */
  Sl = 'SL',
  /** San Marino */
  Sm = 'SM',
  /** Senegal */
  Sn = 'SN',
  /** Somalia */
  So = 'SO',
  /** Suriname */
  Sr = 'SR',
  /** South Sudan */
  Ss = 'SS',
  /** Sao Tome and Principe */
  St = 'ST',
  /** El Salvador */
  Sv = 'SV',
  /** Sint Maarten (Dutch part) */
  Sx = 'SX',
  /** Syria */
  Sy = 'SY',
  /** Eswatini */
  Sz = 'SZ',
  /** Turks and Caicos Islands */
  Tc = 'TC',
  /** Chad */
  Td = 'TD',
  /** French Southern Territories */
  Tf = 'TF',
  /** Togo */
  Tg = 'TG',
  /** Thailand */
  Th = 'TH',
  /** Tajikistan */
  Tj = 'TJ',
  /** Tokelau */
  Tk = 'TK',
  /** Timor-Leste */
  Tl = 'TL',
  /** Turkmenistan */
  Tm = 'TM',
  /** Tunisia */
  Tn = 'TN',
  /** Tonga */
  To = 'TO',
  /** Türkiye */
  Tr = 'TR',
  /** Trinidad and Tobago */
  Tt = 'TT',
  /** Tuvalu */
  Tv = 'TV',
  /** Taiwan */
  Tw = 'TW',
  /** Tanzania */
  Tz = 'TZ',
  /** Ukraine */
  Ua = 'UA',
  /** Uganda */
  Ug = 'UG',
  /** United States Minor Outlying Islands */
  Um = 'UM',
  /** United States of America */
  Us = 'US',
  /** Uruguay */
  Uy = 'UY',
  /** Uzbekistan */
  Uz = 'UZ',
  /** Vatican City */
  Va = 'VA',
  /** Saint Vincent and the Grenadines */
  Vc = 'VC',
  /** Venezuela */
  Ve = 'VE',
  /** Virgin Islands (British) */
  Vg = 'VG',
  /** Virgin Islands (U.S.) */
  Vi = 'VI',
  /** Vietnam */
  Vn = 'VN',
  /** Vanuatu */
  Vu = 'VU',
  /** Wallis and Futuna */
  Wf = 'WF',
  /** Samoa */
  Ws = 'WS',
  /** Yemen */
  Ye = 'YE',
  /** Mayotte */
  Yt = 'YT',
  /** South Africa */
  Za = 'ZA',
  /** Zambia */
  Zm = 'ZM',
  /** Zimbabwe */
  Zw = 'ZW'
}

/** An enumeration. */
export enum PlanFeaturesContactPersonsPublicData {
  /** Show all information */
  All = 'ALL',
  /** Show all information but only for authenticated users */
  AllForAuthenticated = 'ALL_FOR_AUTHENTICATED',
  /** Show only name, role and affiliation */
  Name = 'NAME',
  /** Do not show contact persons publicly */
  None = 'NONE'
}

/** PlanFeatures(id, latest_revision, plan, allow_images_for_actions, show_admin_link, allow_public_site_login, expose_unpublished_plan_only_to_authenticated_user, contact_persons_public_data, contact_persons_show_picture, contact_persons_show_organization_ancestors, contact_persons_hide_moderators, has_action_identifiers, show_action_identifiers, has_action_contact_person_roles, minimal_statuses, has_action_official_name, has_action_lead_paragraph, has_action_primary_orgs, enable_search, enable_indicator_comparison, enable_indicator_factors, indicator_ordering, moderation_workflow, display_field_visibility_restrictions, output_report_action_print_layout, password_protected, indicators_open_in_modal, enable_change_log, enable_community_engagement, enable_action_pdf_export_in_public_ui, hide_from_search_engines, admin_accessibility_conformance_level) */
export type PlanFeaturesInput = {
  /** Set if the plan uses meaningful action identifiers */
  hasActionIdentifiers: InputMaybe<Scalars['Boolean']['input']>;
  /** Set if the plan uses the lead paragraph field */
  hasActionLeadParagraph: InputMaybe<Scalars['Boolean']['input']>;
  /** Set if the plan uses the official name field */
  hasActionOfficialName: InputMaybe<Scalars['Boolean']['input']>;
  /** Set if actions have a clear primary organization (such as multi-city plans) */
  hasActionPrimaryOrgs: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * The Action Plan under monitoring.
 *
 * Most information in this service is linked to a Plan.
 */
export type PlanInput = {
  /** ISO 3166-1 country code (e.g. FI, DE, US) */
  country: Scalars['String']['input'];
  features: InputMaybe<PlanFeaturesInput>;
  /** A unique identifier for the plan used internally to distinguish between plans. This becomes part of the site URL used during onboarding. Use lowercase letters and dashes. */
  identifier: Scalars['ID']['input'];
  /** The official plan name in full form */
  name: Scalars['String']['input'];
  /** The main organization for the plan */
  organizationId: Scalars['ID']['input'];
  /** Additional language codes (ISO 639-1) */
  otherLanguages: Array<Scalars['String']['input']>;
  /** Primary language code (ISO 639-1, e.g. "en-US", "fi", "de-CH") */
  primaryLanguage: Scalars['String']['input'];
  /** A shorter version of the plan name */
  shortName: InputMaybe<Scalars['String']['input']>;
  themeIdentifier: InputMaybe<Scalars['ID']['input']>;
};

/** An enumeration. */
export enum PublicationStatus {
  Published = 'PUBLISHED',
  Scheduled = 'SCHEDULED',
  Unpublished = 'UNPUBLISHED'
}

/** An enumeration. */
export enum RelatedCommonIndicatorEffectType {
  /** decreases */
  Decreases = 'DECREASES',
  /** increases */
  Increases = 'INCREASES',
  /** is a part of */
  PartOf = 'PART_OF'
}

/** An enumeration. */
export enum RelatedIndicatorConfidenceLevel {
  /** high */
  High = 'HIGH',
  /** low */
  Low = 'LOW',
  /** medium */
  Medium = 'MEDIUM'
}

/** An enumeration. */
export enum RelatedIndicatorEffectType {
  /** decreases */
  Decreases = 'DECREASES',
  /** increases */
  Increases = 'INCREASES',
  /** is a part of */
  PartOf = 'PART_OF'
}

/** Enum for search operator. */
export enum SearchOperatorEnum {
  And = 'AND',
  Or = 'OR'
}

/** An enumeration. */
export enum Sentiment {
  Negative = 'NEGATIVE',
  Neutral = 'NEUTRAL',
  Positive = 'POSITIVE'
}

/** An enumeration. */
export enum SiteGeneralContentActionTaskTerm {
  /** Milestone */
  Milestone = 'MILESTONE',
  /** Task */
  Task = 'TASK'
}

/** An enumeration. */
export enum SiteGeneralContentActionTerm {
  /** Action */
  Action = 'ACTION',
  /** Case study */
  CaseStudy = 'CASE_STUDY',
  /** Strategy */
  Strategy = 'STRATEGY'
}

/** An enumeration. */
export enum SiteGeneralContentIndicatorTerm {
  /** Indicator */
  Indicator = 'INDICATOR',
  /** Measure */
  Measure = 'MEASURE'
}

/** An enumeration. */
export enum SiteGeneralContentOrganizationTerm {
  /** Division */
  Division = 'DIVISION',
  /** Organization */
  Organization = 'ORGANIZATION'
}

export type UserFeedbackMutationInput = {
  action: InputMaybe<Scalars['ID']['input']>;
  additionalFields: InputMaybe<Scalars['String']['input']>;
  category: InputMaybe<Scalars['ID']['input']>;
  clientMutationId: InputMaybe<Scalars['String']['input']>;
  comment: InputMaybe<Scalars['String']['input']>;
  email: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  pageId: InputMaybe<Scalars['String']['input']>;
  plan: Scalars['ID']['input'];
  pledge: InputMaybe<Scalars['ID']['input']>;
  type: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export enum WorkflowState {
  Approved = 'APPROVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

/** An enumeration. */
export enum WorkflowStateStatus {
  /** Approved */
  Approved = 'APPROVED',
  /** Cancelled */
  Cancelled = 'CANCELLED',
  /** In progress */
  InProgress = 'IN_PROGRESS',
  /** Needs changes */
  NeedsChanges = 'NEEDS_CHANGES'
}

export type HeroImageFragment = (
  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
    { id: string, width: number, height: number, src: string }
    & { __typename: 'ImageRendition' }
  ) | null, fullMedium: (
    { id: string, width: number, height: number, src: string }
    & { __typename: 'ImageRendition' }
  ) | null, fullSmall: (
    { id: string, width: number, height: number, src: string }
    & { __typename: 'ImageRendition' }
  ) | null }
  & { __typename: 'Image' }
);

export type CardImageFragment = (
  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
    { id: string, width: number, height: number, src: string }
    & { __typename: 'ImageRendition' }
  ) | null, rendition: (
    { id: string, width: number, height: number, src: string }
    & { __typename: 'ImageRendition' }
  ) | null }
  & { __typename: 'Image' }
);

export type SocialImageFragment = (
  { id: string, social: (
    { id: string, width: number, height: number, src: string }
    & { __typename: 'ImageRendition' }
  ) | null }
  & { __typename: 'Image' }
);

export type SearchQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  query: Scalars['String']['input'];
  onlyOtherPlans: InputMaybe<Scalars['Boolean']['input']>;
  clientUrl: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchQuery = (
  { search: (
    { hits: Array<(
      { id: string, title: string, url: string | null, highlight: string | null, plan: (
        { id: string, identifier: string, name: string, shortName: string | null, image: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, organization: (
          { id: string, name: string }
          & { __typename: 'Organization' }
        ) }
        & { __typename: 'Plan' }
      ), object: (
        { identifier: string, primaryOrg: (
          { id: string, name: string, logo: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Organization' }
        ) | null }
        & { __typename: 'Action' }
      ) | (
        { id: string }
        & { __typename: 'Indicator' }
      ) | null, page: (
        { id: string | null, title: string }
        & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      ) | (
        { id: string | null, title: string, category: (
          { id: string, level: (
            { id: string, name: string }
            & { __typename: 'CategoryLevel' }
          ) | null }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'CategoryPage' }
      ) | null }
      & { __typename: 'SearchHit' }
    )> }
    & { __typename: 'SearchResults' }
  ) }
  & { __typename: 'Query' }
);

export type ActionHightlightListQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  first: Scalars['Int']['input'];
  orderBy: Scalars['String']['input'];
}>;


export type ActionHightlightListQuery = (
  { planActions: Array<(
    { id: string, identifier: string, name: string, officialName: string | null, completion: number | null, updatedAt: string, color: string | null, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, plan: (
      { id: string }
      & { __typename: 'Plan' }
    ), status: (
      { id: string, identifier: string, name: string, color: string }
      & { __typename: 'ActionStatus' }
    ) | null, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename: 'ActionStatusSummary' }
    ), implementationPhase: (
      { id: string, name: string, identifier: string }
      & { __typename: 'ActionImplementationPhase' }
    ) | null, categories: Array<(
      { id: string, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, parent: (
        { id: string, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, parent: (
          { id: string, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'Category' }
    )> }
    & { __typename: 'Action' }
  )> | null }
  & { __typename: 'Query' }
);

export type ActionUpdatesQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
}>;


export type ActionUpdatesQuery = (
  { action: (
    { id: string, statusUpdates: Array<(
      { id: string, title: string, date: string, content: string, author: (
        { id: string, firstName: string, lastName: string, avatarUrl: string | null }
        & { __typename: 'Person' }
      ) | null }
      & { __typename: 'ActionStatusUpdate' }
    )> }
    & { __typename: 'Action' }
  ) | null }
  & { __typename: 'Query' }
);

export type ActionListQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  clientUrl: Scalars['String']['input'];
}>;


export type ActionListQuery = (
  { planActions: Array<(
    { hasDependencyRelationships: boolean | null, id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, image: (
      { id: string, rendition: (
        { id: string, width: number, height: number, src: string, alt: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, status: (
      { id: string, identifier: string, name: string, color: string }
      & { __typename: 'ActionStatus' }
    ) | null, categories: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, indicatorRelationships: Array<(
        { id: string, type: IndicatorCategoryRelationshipType, indicator: (
          { id: string }
          & { __typename: 'Indicator' }
        ) }
        & { __typename: 'IndicatorCategoryRelationship' }
      )>, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )>, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'Category' }
    )>, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename: 'ActionStatusSummary' }
    ), implementationPhase: (
      { id: string, identifier: string, name: string }
      & { __typename: 'ActionImplementationPhase' }
    ) | null, primaryOrg: (
      { id: string, abbreviation: string | null, name: string, logo: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Organization' }
    ) | null, mergedWith: (
      { id: string, identifier: string, viewUrl: string, plan: (
        { id: string, shortName: string | null, name: string, versionName: string, viewUrl: string | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ) | null, plan: (
      { id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Plan' }
    ) }
    & { __typename: 'Action' }
  )> | null }
  & { __typename: 'Query' }
);

export type ContactDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  plan: Scalars['ID']['input'];
}>;


export type ContactDetailsQuery = (
  { person: (
    { id: string, email: string, organization: (
      { id: string, name: string, ancestors: Array<(
        { id: string, name: string, classification: (
          { id: string, name: string }
          & { __typename: 'OrganizationClass' }
        ) | null }
        & { __typename: 'Organization' }
      ) | null> | null }
      & { __typename: 'Organization' }
    ) }
    & { __typename: 'Person' }
  ) | null }
  & { __typename: 'Query' }
);

export type ActionDependenciesQueryVariables = Exact<{
  action: Scalars['ID']['input'];
  workflow: InputMaybe<WorkflowState>;
}>;


export type ActionDependenciesQuery = (
  { action: (
    { id: string, dependencyRole: (
      { id: string, name: string }
      & { __typename: 'ActionDependencyRole' }
    ) | null, allDependencyRelationships: Array<(
      { id: string, preceding: (
        { id: string, dependencyRole: (
          { id: string }
          & { __typename: 'ActionDependencyRole' }
        ) | null }
        & { __typename: 'Action' }
      ), dependent: (
        { id: string, dependencyRole: (
          { id: string }
          & { __typename: 'ActionDependencyRole' }
        ) | null }
        & { __typename: 'Action' }
      ) }
      & { __typename: 'ActionDependencyRelationship' }
    )> }
    & { __typename: 'Action' }
  ) | null }
  & { __typename: 'Query' }
);

export type CreateUserFeedbackMutationVariables = Exact<{
  input: UserFeedbackMutationInput;
}>;


export type CreateUserFeedbackMutation = (
  { createUserFeedback: (
    { feedback: (
      { id: string, createdAt: string }
      & { __typename: 'UserFeedbackNode' }
    ) | null, errors: Array<(
      { field: string, messages: Array<string> }
      & { __typename: 'ErrorType' }
    )> }
    & { __typename: 'UserFeedbackMutationPayload' }
  ) | null }
  & { __typename: 'Mutation' }
);

export type ActionListForBlockQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  category: InputMaybe<Scalars['ID']['input']>;
  clientUrl: InputMaybe<Scalars['String']['input']>;
  workflow: InputMaybe<WorkflowState>;
}>;


export type ActionListForBlockQuery = (
  { planActions: Array<(
    { hasDependencyRelationships: boolean | null, id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, status: (
      { id: string, identifier: string, name: string, color: string }
      & { __typename: 'ActionStatus' }
    ) | null, categories: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, indicatorRelationships: Array<(
        { id: string, type: IndicatorCategoryRelationshipType, indicator: (
          { id: string }
          & { __typename: 'Indicator' }
        ) }
        & { __typename: 'IndicatorCategoryRelationship' }
      )>, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )>, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'Category' }
    )>, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename: 'ActionStatusSummary' }
    ), implementationPhase: (
      { id: string, identifier: string, name: string }
      & { __typename: 'ActionImplementationPhase' }
    ) | null, primaryOrg: (
      { id: string, abbreviation: string | null, name: string, logo: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Organization' }
    ) | null, mergedWith: (
      { id: string, identifier: string, viewUrl: string, plan: (
        { id: string, shortName: string | null, name: string, versionName: string, viewUrl: string | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ) | null, plan: (
      { id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Plan' }
    ) }
    & { __typename: 'Action' }
  )> | null }
  & { __typename: 'Query' }
);

export type ActionListForGraphsQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  categoryId: InputMaybe<Scalars['ID']['input']>;
}>;


export type ActionListForGraphsQuery = (
  { planActions: Array<(
    { id: string, color: string | null, scheduleContinuous: boolean, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename: 'ActionStatusSummary' }
    ), timeliness: (
      { identifier: ActionTimelinessIdentifier }
      & { __typename: 'ActionTimeliness' }
    ), implementationPhase: (
      { id: string, identifier: string, name: string }
      & { __typename: 'ActionImplementationPhase' }
    ) | null }
    & { __typename: 'Action' }
  )> | null }
  & { __typename: 'Query' }
);

export type CategoryAttributeTypesQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
}>;


export type CategoryAttributeTypesQuery = (
  { plan: (
    { id: string, categoryTypes: Array<(
      { id: string, name: string, attributeTypes: Array<(
        { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        )>, unit: (
          { id: string, name: string }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      )> }
      & { __typename: 'CategoryType' }
    )> }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type CategoriesForTreeMapQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  categoryType: Scalars['ID']['input'];
  attributeType: Scalars['ID']['input'];
}>;


export type CategoriesForTreeMapQuery = (
  { planCategories: Array<(
    { id: string, name: string, leadParagraph: string, color: string, image: (
      { id: string, title: string, imageCredit: string, altText: string, rendition: (
        { id: string, width: number, height: number, src: string, alt: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, path: string, slug: string, url: string | null, urlPath: string, depth: number | null, contentType: string, body: Array<{ __typename: 'ActionListBlock' | 'AdaptiveEmbedBlock' | 'CategoryListBlock' | 'ChangeLogMessageBlock' | 'DashboardRowBlock' | 'IndicatorGroupBlock' | 'QuestionAnswerBlock' | 'RelatedIndicatorsBlock' } | (
        { value: string }
        & { __typename: 'RichTextBlock' }
      )> | null }
      & { __typename: 'CategoryPage' }
    ) | null, parent: (
      { id: string }
      & { __typename: 'Category' }
    ) | null, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, type: (
      { id: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ), attributes: Array<(
      { id: string }
      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeRichText' | 'AttributeText' }
    ) | (
      { value: number, id: string }
      & { __typename: 'AttributeNumericValue' }
    )> }
    & { __typename: 'Category' }
  )> | null }
  & { __typename: 'Query' }
);

export type CommonCategoryFragment = (
  { id: string, common: (
    { id: string, identifier: string, name: string, order: number }
    & { __typename: 'CommonCategory' }
  ) | null }
  & { __typename: 'Category' }
);

export type PlanFragment = (
  { id: string, categoryTypes: Array<(
    { id: string, identifier: string, name: string, usableForActions: boolean, hideCategoryIdentifiers: boolean, common: (
      { identifier: string, name: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CommonCategoryType' }
    ) | null, categories: Array<(
      { id: string, identifier: string, order: number, name: string, color: string, iconSvgUrl: string | null, parent: (
        { id: string, common?: (
          { id: string }
          & { __typename: 'CommonCategory' }
        ) | null }
        & { __typename: 'Category' }
      ) | null, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, common: (
        { id: string, identifier: string, name: string, order: number }
        & { __typename: 'CommonCategory' }
      ) | null }
      & { __typename: 'Category' }
    )> }
    & { __typename: 'CategoryType' }
  )>, primaryOrgs: Array<(
    { id: string, abbreviation: string | null, name: string }
    & { __typename: 'Organization' }
  )> }
  & { __typename: 'Plan' }
);

export type RelatedPlanFragment = (
  { id: string, shortName: string | null, name: string, shortIdentifier: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
    { id: string, rendition: (
      { id: string, src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, generalContent: (
    { id: string, actionTaskTerm: SiteGeneralContentActionTaskTerm, organizationTerm: SiteGeneralContentOrganizationTerm }
    & { __typename: 'SiteGeneralContent' }
  ), actionImplementationPhases: Array<(
    { id: string, identifier: string, name: string, order: number, color: string }
    & { __typename: 'ActionImplementationPhase' }
  )> }
  & { __typename: 'Plan' }
);

export type ActionFragment = (
  { id: string, identifier: string, name: string, viewUrl?: string, color: string | null, hasDependencyRelationships: boolean | null, manualStatusReason: string | null, completion: number | null, officialName: string | null, updatedAt: string, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, order: number, indicatorsCount: number | null, hasIndicatorsWithGoals: boolean | null, status: (
    { id: string, identifier: string, name: string, color: string }
    & { __typename: 'ActionStatus' }
  ) | null, categories: Array<(
    { id: string, common: (
      { id: string }
      & { __typename: 'CommonCategory' }
    ) | null }
    & { __typename: 'Category' }
  )>, implementationPhase: (
    { id: string, identifier: string, name: string, order: number }
    & { __typename: 'ActionImplementationPhase' }
  ) | null, statusSummary: (
    { identifier: ActionStatusSummaryIdentifier, label: string, isActive: boolean, isCompleted: boolean, sentiment: Sentiment }
    & { __typename: 'ActionStatusSummary' }
  ), timeliness: (
    { identifier: ActionTimelinessIdentifier }
    & { __typename: 'ActionTimeliness' }
  ), plan: (
    { id: string, shortName: string | null, name: string, shortIdentifier: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, generalContent: (
      { id: string, actionTaskTerm: SiteGeneralContentActionTaskTerm, organizationTerm: SiteGeneralContentOrganizationTerm }
      & { __typename: 'SiteGeneralContent' }
    ), actionImplementationPhases: Array<(
      { id: string, identifier: string, name: string, order: number, color: string }
      & { __typename: 'ActionImplementationPhase' }
    )> }
    & { __typename: 'Plan' }
  ), schedule: Array<(
    { id: string }
    & { __typename: 'ActionSchedule' }
  )>, impact: (
    { id: string, identifier: string }
    & { __typename: 'ActionImpact' }
  ) | null, attributes: Array<(
    { id: string, type: (
      { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) | null }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'AttributeCategoryChoice' }
  ) | (
    { text: string | null, id: string, choice: (
      { id: string, name: string }
      & { __typename: 'AttributeTypeChoiceOption' }
    ) | null, type: (
      { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) | null }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'AttributeChoice' }
  ) | (
    { id: string, numericValue: number, type: (
      { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) | null }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'AttributeNumericValue' }
  ) | (
    { value: string, id: string, type: (
      { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) | null }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'AttributeRichText' | 'AttributeText' }
  )>, responsibleParties: Array<(
    { id: string, role: ActionResponsiblePartyRole | null, hasContactPerson: boolean, organization: (
      { id: string, abbreviation: string | null, name: string }
      & { __typename: 'Organization' }
    ) }
    & { __typename: 'ActionResponsibleParty' }
  )>, primaryOrg: (
    { id: string, abbreviation: string | null, name: string, logo: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null }
    & { __typename: 'Organization' }
  ) | null, tasks: Array<(
    { id: string, state: ActionTaskState, dueAt: string }
    & { __typename: 'ActionTask' }
  )>, mergedWith: (
    { id: string, identifier: string, viewUrl: string, plan: (
      { id: string, shortName: string | null, viewUrl: string | null }
      & { __typename: 'Plan' }
    ) }
    & { __typename: 'Action' }
  ) | null }
  & { __typename: 'Action' }
);

export type OrganizationFragment = (
  { id: string, abbreviation: string | null, name: string, contactPersonCount: number, actionCount: number, classification: (
    { id: string, name: string }
    & { __typename: 'OrganizationClass' }
  ) | null, parent: (
    { id: string }
    & { __typename: 'Organization' }
  ) | null }
  & { __typename: 'Organization' }
);

export type DashboardActionListQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  relatedPlanActions: Scalars['Boolean']['input'];
  path: Scalars['String']['input'];
  workflow: InputMaybe<WorkflowState>;
}>;


export type DashboardActionListQuery = (
  { plan: (
    { id: string, categoryTypes: Array<(
      { id: string, identifier: string, name: string, usableForActions: boolean, hideCategoryIdentifiers: boolean, common: (
        { identifier: string, name: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CommonCategoryType' }
      ) | null, categories: Array<(
        { id: string, identifier: string, order: number, name: string, color: string, iconSvgUrl: string | null, parent: (
          { id: string, common?: (
            { id: string }
            & { __typename: 'CommonCategory' }
          ) | null }
          & { __typename: 'Category' }
        ) | null, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, common: (
          { id: string, identifier: string, name: string, order: number }
          & { __typename: 'CommonCategory' }
        ) | null }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    )>, primaryOrgs: Array<(
      { id: string, abbreviation: string | null, name: string }
      & { __typename: 'Organization' }
    )> }
    & { __typename: 'Plan' }
  ) | null, planActions?: Array<(
    { id: string, identifier: string, name: string, viewUrl?: string, color: string | null, hasDependencyRelationships: boolean | null, manualStatusReason: string | null, completion: number | null, officialName: string | null, updatedAt: string, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, order: number, indicatorsCount: number | null, hasIndicatorsWithGoals: boolean | null, status: (
      { id: string, identifier: string, name: string, color: string }
      & { __typename: 'ActionStatus' }
    ) | null, categories: Array<(
      { id: string, common: (
        { id: string }
        & { __typename: 'CommonCategory' }
      ) | null }
      & { __typename: 'Category' }
    )>, implementationPhase: (
      { id: string, identifier: string, name: string, order: number }
      & { __typename: 'ActionImplementationPhase' }
    ) | null, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier, label: string, isActive: boolean, isCompleted: boolean, sentiment: Sentiment }
      & { __typename: 'ActionStatusSummary' }
    ), timeliness: (
      { identifier: ActionTimelinessIdentifier }
      & { __typename: 'ActionTimeliness' }
    ), plan: (
      { id: string, shortName: string | null, name: string, shortIdentifier: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, generalContent: (
        { id: string, actionTaskTerm: SiteGeneralContentActionTaskTerm, organizationTerm: SiteGeneralContentOrganizationTerm }
        & { __typename: 'SiteGeneralContent' }
      ), actionImplementationPhases: Array<(
        { id: string, identifier: string, name: string, order: number, color: string }
        & { __typename: 'ActionImplementationPhase' }
      )> }
      & { __typename: 'Plan' }
    ), schedule: Array<(
      { id: string }
      & { __typename: 'ActionSchedule' }
    )>, impact: (
      { id: string, identifier: string }
      & { __typename: 'ActionImpact' }
    ) | null, attributes: Array<(
      { id: string, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeCategoryChoice' }
    ) | (
      { text: string | null, id: string, choice: (
        { id: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      ) | null, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeChoice' }
    ) | (
      { id: string, numericValue: number, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )>, responsibleParties: Array<(
      { id: string, role: ActionResponsiblePartyRole | null, hasContactPerson: boolean, organization: (
        { id: string, abbreviation: string | null, name: string }
        & { __typename: 'Organization' }
      ) }
      & { __typename: 'ActionResponsibleParty' }
    )>, primaryOrg: (
      { id: string, abbreviation: string | null, name: string, logo: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Organization' }
    ) | null, tasks: Array<(
      { id: string, state: ActionTaskState, dueAt: string }
      & { __typename: 'ActionTask' }
    )>, mergedWith: (
      { id: string, identifier: string, viewUrl: string, plan: (
        { id: string, shortName: string | null, viewUrl: string | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ) | null }
    & { __typename: 'Action' }
  )> | null, relatedPlanActions?: Array<(
    { id: string, identifier: string, name: string, viewUrl?: string, color: string | null, hasDependencyRelationships: boolean | null, manualStatusReason: string | null, completion: number | null, officialName: string | null, updatedAt: string, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, order: number, indicatorsCount: number | null, hasIndicatorsWithGoals: boolean | null, status: (
      { id: string, identifier: string, name: string, color: string }
      & { __typename: 'ActionStatus' }
    ) | null, categories: Array<(
      { id: string, common: (
        { id: string }
        & { __typename: 'CommonCategory' }
      ) | null }
      & { __typename: 'Category' }
    )>, implementationPhase: (
      { id: string, identifier: string, name: string, order: number }
      & { __typename: 'ActionImplementationPhase' }
    ) | null, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier, label: string, isActive: boolean, isCompleted: boolean, sentiment: Sentiment }
      & { __typename: 'ActionStatusSummary' }
    ), timeliness: (
      { identifier: ActionTimelinessIdentifier }
      & { __typename: 'ActionTimeliness' }
    ), plan: (
      { id: string, shortName: string | null, name: string, shortIdentifier: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, generalContent: (
        { id: string, actionTaskTerm: SiteGeneralContentActionTaskTerm, organizationTerm: SiteGeneralContentOrganizationTerm }
        & { __typename: 'SiteGeneralContent' }
      ), actionImplementationPhases: Array<(
        { id: string, identifier: string, name: string, order: number, color: string }
        & { __typename: 'ActionImplementationPhase' }
      )> }
      & { __typename: 'Plan' }
    ), schedule: Array<(
      { id: string }
      & { __typename: 'ActionSchedule' }
    )>, impact: (
      { id: string, identifier: string }
      & { __typename: 'ActionImpact' }
    ) | null, attributes: Array<(
      { id: string, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeCategoryChoice' }
    ) | (
      { text: string | null, id: string, choice: (
        { id: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      ) | null, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeChoice' }
    ) | (
      { id: string, numericValue: number, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )>, responsibleParties: Array<(
      { id: string, role: ActionResponsiblePartyRole | null, hasContactPerson: boolean, organization: (
        { id: string, abbreviation: string | null, name: string }
        & { __typename: 'Organization' }
      ) }
      & { __typename: 'ActionResponsibleParty' }
    )>, primaryOrg: (
      { id: string, abbreviation: string | null, name: string, logo: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Organization' }
    ) | null, tasks: Array<(
      { id: string, state: ActionTaskState, dueAt: string }
      & { __typename: 'ActionTask' }
    )>, mergedWith: (
      { id: string, identifier: string, viewUrl: string, plan: (
        { id: string, shortName: string | null, viewUrl: string | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ) | null }
    & { __typename: 'Action' }
  )> | null, planPage: (
    { id: string | null }
    & { __typename: 'AccessibilityStatementPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
  ) | (
    { id: string | null, dashboardColumns: Array<(
      { columnLabel: string | null }
      & { __typename: 'EndDateColumnBlock' | 'IdentifierColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorsColumnBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'ResponsiblePartiesColumnBlock' | 'ScheduleContinuousColumnBlock' | 'StartDateColumnBlock' | 'StatusColumnBlock' | 'TasksColumnBlock' | 'UpdatedAtColumnBlock' }
    ) | (
      { columnLabel: string | null, field: string, attributeType: (
        { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        )>, unit: (
          { id: string, name: string }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) | null }
      & { __typename: 'FieldColumnBlock' }
    )> | null }
    & { __typename: 'ActionListPage' }
  ) | null, planOrganizations: Array<(
    { id: string, abbreviation: string | null, name: string, contactPersonCount: number, actionCount: number, classification: (
      { id: string, name: string }
      & { __typename: 'OrganizationClass' }
    ) | null, parent: (
      { id: string }
      & { __typename: 'Organization' }
    ) | null }
    & { __typename: 'Organization' }
  )> | null }
  & { __typename: 'Query' }
);

export type EmbedActionQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  identifier: Scalars['ID']['input'];
}>;


export type EmbedActionQuery = (
  { action: (
    { id: string, identifier: string, name: string, officialName: string | null, completion: number | null, updatedAt: string, color: string | null, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, plan: (
      { id: string }
      & { __typename: 'Plan' }
    ), statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename: 'ActionStatusSummary' }
    ), status: (
      { id: string, identifier: string, name: string, color: string }
      & { __typename: 'ActionStatus' }
    ) | null, implementationPhase: (
      { id: string, name: string, identifier: string }
      & { __typename: 'ActionImplementationPhase' }
    ) | null, categories: Array<(
      { id: string, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, parent: (
        { id: string, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, parent: (
          { id: string, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'Category' }
    )> }
    & { __typename: 'Action' }
  ) | null }
  & { __typename: 'Query' }
);

export type IndicatorHightlightListQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  first: Scalars['Int']['input'];
  orderBy: Scalars['String']['input'];
}>;


export type IndicatorHightlightListQuery = (
  { planIndicators: Array<(
    { id: string, identifier: string | null, name: string, updatedAt: string, level: string | null, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ), latestValue: (
      { id: string, value: number }
      & { __typename: 'IndicatorValue' }
    ) | null }
    & { __typename: 'Indicator' }
  )> | null }
  & { __typename: 'Query' }
);

export type CreatePledgeFeedbackMutationVariables = Exact<{
  input: UserFeedbackMutationInput;
}>;


export type CreatePledgeFeedbackMutation = (
  { createUserFeedback: (
    { feedback: (
      { id: string, createdAt: string }
      & { __typename: 'UserFeedbackNode' }
    ) | null, errors: Array<(
      { field: string, messages: Array<string> }
      & { __typename: 'ErrorType' }
    )> }
    & { __typename: 'UserFeedbackMutationPayload' }
  ) | null }
  & { __typename: 'Mutation' }
);

export type RegisterPublicUserMutationVariables = Exact<{ [key: string]: never; }>;


export type RegisterPublicUserMutation = (
  { pledge: (
    { registerUser: (
      { uuid: string }
      & { __typename: 'RegisterPublicUserPayload' }
    ) | null }
    & { __typename: 'PledgeMutations' }
  ) }
  & { __typename: 'Mutation' }
);

export type CommitToPledgeMutationVariables = Exact<{
  user: Scalars['UUID']['input'];
  pledge: Scalars['ID']['input'];
  committed: Scalars['Boolean']['input'];
}>;


export type CommitToPledgeMutation = (
  { pledge: (
    { commitToPledge: (
      { committed: boolean }
      & { __typename: 'CommitToPledgePayload' }
    ) | null }
    & { __typename: 'PledgeMutations' }
  ) }
  & { __typename: 'Mutation' }
);

export type PublicUserDataMutationVariables = Exact<{
  user: Scalars['UUID']['input'];
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
}>;


export type PublicUserDataMutation = (
  { pledge: (
    { setUserData: (
      { uuid: string }
      & { __typename: 'SetUserDataPayload' }
    ) | null }
    & { __typename: 'PledgeMutations' }
  ) }
  & { __typename: 'Mutation' }
);

export type PublicUserQueryVariables = Exact<{
  user: Scalars['UUID']['input'];
}>;


export type PublicUserQuery = (
  { publicUser: (
    { id: string, uuid: string, userData: string, commitments: Array<(
      { id: string, pledge: (
        { id: string, slug: string, name: string }
        & { __typename: 'Pledge' }
      ) | null }
      & { __typename: 'PledgeCommitment' }
    )> | null }
    & { __typename: 'PublicUser' }
  ) | null }
  & { __typename: 'Query' }
);

type AttributesBlockAttribute_AttributeCategoryChoice_Fragment = (
  { id: string, categories: Array<(
    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, indicators: Array<(
      { id: string, values: Array<(
        { id: string, date: string | null, value: number }
        & { __typename: 'IndicatorValue' }
      )>, goals: Array<(
        { id: string, date: string | null, value: number }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    )>, indicatorRelationships: Array<(
      { id: string, type: IndicatorCategoryRelationshipType, indicator: (
        { id: string }
        & { __typename: 'Indicator' }
      ) }
      & { __typename: 'IndicatorCategoryRelationship' }
    )>, iconImage: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, urlPath: string, live: boolean }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ), attributes: Array<(
      { id: string, key: string }
      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, key: string }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )>, parent: (
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, indicatorRelationships: Array<(
        { id: string, type: IndicatorCategoryRelationshipType, indicator: (
          { id: string }
          & { __typename: 'Indicator' }
        ) }
        & { __typename: 'IndicatorCategoryRelationship' }
      )>, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Category' }
    ) | null }
    & { __typename: 'Category' }
  )>, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'AttributeCategoryChoice' }
);

type AttributesBlockAttribute_AttributeChoice_Fragment = (
  { text: string | null, id: string, choice: (
    { id: string, identifier: string, name: string }
    & { __typename: 'AttributeTypeChoiceOption' }
  ) | null, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'AttributeChoice' }
);

type AttributesBlockAttribute_AttributeNumericValue_Fragment = (
  { id: string, numericValue: number, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'AttributeNumericValue' }
);

type AttributesBlockAttribute_AttributeRichText_AttributeText_Fragment = (
  { value: string, id: string, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'AttributeRichText' | 'AttributeText' }
);

export type AttributesBlockAttributeFragment = AttributesBlockAttribute_AttributeCategoryChoice_Fragment | AttributesBlockAttribute_AttributeChoice_Fragment | AttributesBlockAttribute_AttributeNumericValue_Fragment | AttributesBlockAttribute_AttributeRichText_AttributeText_Fragment;

export type AttributesBlockAttributeTypeFragment = (
  { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
    { id: string, identifier: string, name: string }
    & { __typename: 'AttributeTypeChoiceOption' }
  )>, unit: (
    { id: string, name: string }
    & { __typename: 'Unit' }
  ) | null }
  & { __typename: 'AttributeType' }
);

type AttributesBlockAttributeWithNestedType_AttributeCategoryChoice_Fragment = (
  { id: string, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) | null, choiceOptions: Array<(
      { id: string, identifier: string, name: string }
      & { __typename: 'AttributeTypeChoiceOption' }
    )> }
    & { __typename: 'AttributeType' }
  ), categories: Array<(
    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, indicators: Array<(
      { id: string, values: Array<(
        { id: string, date: string | null, value: number }
        & { __typename: 'IndicatorValue' }
      )>, goals: Array<(
        { id: string, date: string | null, value: number }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    )>, indicatorRelationships: Array<(
      { id: string, type: IndicatorCategoryRelationshipType, indicator: (
        { id: string }
        & { __typename: 'Indicator' }
      ) }
      & { __typename: 'IndicatorCategoryRelationship' }
    )>, iconImage: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, urlPath: string, live: boolean }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ), attributes: Array<(
      { id: string, key: string }
      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, key: string }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )>, parent: (
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, indicatorRelationships: Array<(
        { id: string, type: IndicatorCategoryRelationshipType, indicator: (
          { id: string }
          & { __typename: 'Indicator' }
        ) }
        & { __typename: 'IndicatorCategoryRelationship' }
      )>, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Category' }
    ) | null }
    & { __typename: 'Category' }
  )> }
  & { __typename: 'AttributeCategoryChoice' }
);

type AttributesBlockAttributeWithNestedType_AttributeChoice_Fragment = (
  { text: string | null, id: string, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) | null, choiceOptions: Array<(
      { id: string, identifier: string, name: string }
      & { __typename: 'AttributeTypeChoiceOption' }
    )> }
    & { __typename: 'AttributeType' }
  ), choice: (
    { id: string, identifier: string, name: string }
    & { __typename: 'AttributeTypeChoiceOption' }
  ) | null }
  & { __typename: 'AttributeChoice' }
);

type AttributesBlockAttributeWithNestedType_AttributeNumericValue_Fragment = (
  { id: string, numericValue: number, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) | null, choiceOptions: Array<(
      { id: string, identifier: string, name: string }
      & { __typename: 'AttributeTypeChoiceOption' }
    )> }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'AttributeNumericValue' }
);

type AttributesBlockAttributeWithNestedType_AttributeRichText_AttributeText_Fragment = (
  { value: string, id: string, type: (
    { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) | null, choiceOptions: Array<(
      { id: string, identifier: string, name: string }
      & { __typename: 'AttributeTypeChoiceOption' }
    )> }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'AttributeRichText' | 'AttributeText' }
);

export type AttributesBlockAttributeWithNestedTypeFragment = AttributesBlockAttributeWithNestedType_AttributeCategoryChoice_Fragment | AttributesBlockAttributeWithNestedType_AttributeChoice_Fragment | AttributesBlockAttributeWithNestedType_AttributeNumericValue_Fragment | AttributesBlockAttributeWithNestedType_AttributeRichText_AttributeText_Fragment;

export type ActionCardFragment = (
  { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, status: (
    { id: string, identifier: string, name: string, color: string }
    & { __typename: 'ActionStatus' }
  ) | null, categories: Array<(
    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, indicators: Array<(
      { id: string, values: Array<(
        { id: string, date: string | null, value: number }
        & { __typename: 'IndicatorValue' }
      )>, goals: Array<(
        { id: string, date: string | null, value: number }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    )>, indicatorRelationships: Array<(
      { id: string, type: IndicatorCategoryRelationshipType, indicator: (
        { id: string }
        & { __typename: 'Indicator' }
      ) }
      & { __typename: 'IndicatorCategoryRelationship' }
    )>, iconImage: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, urlPath: string, live: boolean }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ), attributes: Array<(
      { id: string, key: string }
      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, key: string }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )>, parent: (
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, indicatorRelationships: Array<(
        { id: string, type: IndicatorCategoryRelationshipType, indicator: (
          { id: string }
          & { __typename: 'Indicator' }
        ) }
        & { __typename: 'IndicatorCategoryRelationship' }
      )>, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Category' }
    ) | null }
    & { __typename: 'Category' }
  )>, statusSummary: (
    { identifier: ActionStatusSummaryIdentifier }
    & { __typename: 'ActionStatusSummary' }
  ), implementationPhase: (
    { id: string, identifier: string, name: string }
    & { __typename: 'ActionImplementationPhase' }
  ) | null, primaryOrg: (
    { id: string, abbreviation: string | null, name: string, logo: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null }
    & { __typename: 'Organization' }
  ) | null, mergedWith: (
    { id: string, identifier: string, viewUrl: string, plan: (
      { id: string, shortName: string | null, name: string, versionName: string, viewUrl: string | null }
      & { __typename: 'Plan' }
    ) }
    & { __typename: 'Action' }
  ) | null, plan: (
    { id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null }
    & { __typename: 'Plan' }
  ) }
  & { __typename: 'Action' }
);

type ActionListFilter_NamQpVmUnryKDl1H2D8m2IPcp07He5lrrp0r8isOaA_Fragment = (
  { field: string }
  & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' }
);

type ActionListFilter_TyqpX0xFn20cOuzLf6jqgPfDwyKoIUmXbP0Vvf0Gy_Fragment = (
  { field: string }
  & { __typename: 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' }
);

type ActionListFilter_M6gSc5pqzc1a0g6FeXv2Rtn6g7YvjGh6niEypHrkxY_Fragment = (
  { field: string }
  & { __typename: 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ChoiceBlock' | 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' }
);

type ActionListFilter_It2JyYls4Dd8vcP2pLfG3hgEjPhyfUziBquN2Ho6k_Fragment = (
  { field: string }
  & { __typename: 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' }
);

type ActionListFilter_Jh2vQfKUeIcYrzyBfY3tTanYlu2k1R3Sgia12JtaP10_Fragment = (
  { field: string }
  & { __typename: 'IndicatorBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' }
);

type ActionListFilter_JbuLsm3AgmB9ArmgV66if9UTtXwiW57il5x6XNsc_Fragment = (
  { field: string }
  & { __typename: 'PageLinkBlock' | 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' }
);

type ActionListFilter_V2aeCntk28Sdu3p0ZUflYw6N6iIqB4ZRyT2m1kGs_Fragment = (
  { field: string }
  & { __typename: 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
);

type ActionListFilter_ActionAttributeTypeFilterBlock_Fragment = (
  { showAllLabel: string | null, field: string, attributeType: (
    { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
      { id: string, identifier: string, name: string }
      & { __typename: 'AttributeTypeChoiceOption' }
    )> }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'ActionAttributeTypeFilterBlock' }
);

type ActionListFilter_EUodn7sVqbvwUxEYoY8u9Gp8Ybfq3ZviRhOxRp9a94_Fragment = (
  { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
  & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
);

type ActionListFilter_CategoryTypeFilterBlock_Fragment = (
  { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
    { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
      { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
        { id: string }
        & { __typename: 'Category' }
      ) | null, common: (
        { id: string }
        & { __typename: 'CommonCategory' }
      ) | null }
      & { __typename: 'Category' }
    )> }
    & { __typename: 'CategoryType' }
  ) | null }
  & { __typename: 'CategoryTypeFilterBlock' }
);

type ActionListFilter_ContinuousActionFilterBlock_Fragment = (
  { id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
  & { __typename: 'ContinuousActionFilterBlock' }
);

export type ActionListFilterFragment = ActionListFilter_NamQpVmUnryKDl1H2D8m2IPcp07He5lrrp0r8isOaA_Fragment | ActionListFilter_TyqpX0xFn20cOuzLf6jqgPfDwyKoIUmXbP0Vvf0Gy_Fragment | ActionListFilter_M6gSc5pqzc1a0g6FeXv2Rtn6g7YvjGh6niEypHrkxY_Fragment | ActionListFilter_It2JyYls4Dd8vcP2pLfG3hgEjPhyfUziBquN2Ho6k_Fragment | ActionListFilter_Jh2vQfKUeIcYrzyBfY3tTanYlu2k1R3Sgia12JtaP10_Fragment | ActionListFilter_JbuLsm3AgmB9ArmgV66if9UTtXwiW57il5x6XNsc_Fragment | ActionListFilter_V2aeCntk28Sdu3p0ZUflYw6N6iIqB4ZRyT2m1kGs_Fragment | ActionListFilter_ActionAttributeTypeFilterBlock_Fragment | ActionListFilter_EUodn7sVqbvwUxEYoY8u9Gp8Ybfq3ZviRhOxRp9a94_Fragment | ActionListFilter_CategoryTypeFilterBlock_Fragment | ActionListFilter_ContinuousActionFilterBlock_Fragment;

export type ActionListPageFiltersFragment = (
  { id: string | null, primaryFilters: Array<(
    { showAllLabel: string | null, field: string, attributeType: (
      { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
        { id: string, identifier: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      )> }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'ActionAttributeTypeFilterBlock' }
  ) | (
    { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
    & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
  ) | (
    { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
          { id: string }
          & { __typename: 'Category' }
        ) | null, common: (
          { id: string }
          & { __typename: 'CommonCategory' }
        ) | null }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    ) | null }
    & { __typename: 'CategoryTypeFilterBlock' }
  ) | (
    { id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
    & { __typename: 'ContinuousActionFilterBlock' }
  )> | null, mainFilters: Array<(
    { showAllLabel: string | null, field: string, attributeType: (
      { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
        { id: string, identifier: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      )> }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'ActionAttributeTypeFilterBlock' }
  ) | (
    { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
    & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
  ) | (
    { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
          { id: string }
          & { __typename: 'Category' }
        ) | null, common: (
          { id: string }
          & { __typename: 'CommonCategory' }
        ) | null }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    ) | null }
    & { __typename: 'CategoryTypeFilterBlock' }
  ) | (
    { id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
    & { __typename: 'ContinuousActionFilterBlock' }
  )> | null, advancedFilters: Array<(
    { showAllLabel: string | null, field: string, attributeType: (
      { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
        { id: string, identifier: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      )> }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'ActionAttributeTypeFilterBlock' }
  ) | (
    { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
    & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
  ) | (
    { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
          { id: string }
          & { __typename: 'Category' }
        ) | null, common: (
          { id: string }
          & { __typename: 'CommonCategory' }
        ) | null }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    ) | null }
    & { __typename: 'CategoryTypeFilterBlock' }
  ) | (
    { id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
    & { __typename: 'ContinuousActionFilterBlock' }
  )> | null }
  & { __typename: 'ActionListPage' }
);

export type ActionTableColumnFragment = (
  { id: string | null, dashboardColumns: Array<(
    { columnLabel: string | null }
    & { __typename: 'EndDateColumnBlock' | 'IdentifierColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorsColumnBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'ResponsiblePartiesColumnBlock' | 'ScheduleContinuousColumnBlock' | 'StartDateColumnBlock' | 'StatusColumnBlock' | 'TasksColumnBlock' | 'UpdatedAtColumnBlock' }
  ) | (
    { columnLabel: string | null, field: string, attributeType: (
      { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
        { id: string, identifier: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      )>, unit: (
        { id: string, name: string }
        & { __typename: 'Unit' }
      ) | null }
      & { __typename: 'AttributeType' }
    ) | null }
    & { __typename: 'FieldColumnBlock' }
  )> | null }
  & { __typename: 'ActionListPage' }
);

export type CategoryTypeFragment = (
  { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
    { id: string, order: number, name: string, namePlural: string | null }
    & { __typename: 'CategoryLevel' }
  )> }
  & { __typename: 'CategoryType' }
);

export type CategoryFragment = (
  { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
    { id: string, name: string, namePlural: string | null }
    & { __typename: 'CategoryLevel' }
  ) | null, image: (
    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, rendition: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, indicators: Array<(
    { id: string, values: Array<(
      { id: string, date: string | null, value: number }
      & { __typename: 'IndicatorValue' }
    )>, goals: Array<(
      { id: string, date: string | null, value: number }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) }
    & { __typename: 'Indicator' }
  )>, indicatorRelationships: Array<(
    { id: string, type: IndicatorCategoryRelationshipType, indicator: (
      { id: string }
      & { __typename: 'Indicator' }
    ) }
    & { __typename: 'IndicatorCategoryRelationship' }
  )>, iconImage: (
    { id: string, rendition: (
      { id: string, src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, categoryPage: (
    { id: string | null, title: string, urlPath: string, live: boolean }
    & { __typename: 'CategoryPage' }
  ) | null, type: (
    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
    & { __typename: 'CategoryType' }
  ), attributes: Array<(
    { id: string, key: string }
    & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
  ) | (
    { value: string, id: string, key: string }
    & { __typename: 'AttributeRichText' | 'AttributeText' }
  )> }
  & { __typename: 'Category' }
);

export type CategoryWithParentsFragment = (
  { id: string, parent: (
    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, indicatorRelationships: Array<(
        { id: string, type: IndicatorCategoryRelationshipType, indicator: (
          { id: string }
          & { __typename: 'Indicator' }
        ) }
        & { __typename: 'IndicatorCategoryRelationship' }
      )>, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Category' }
    ) | null, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, indicators: Array<(
      { id: string, values: Array<(
        { id: string, date: string | null, value: number }
        & { __typename: 'IndicatorValue' }
      )>, goals: Array<(
        { id: string, date: string | null, value: number }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    )>, indicatorRelationships: Array<(
      { id: string, type: IndicatorCategoryRelationshipType, indicator: (
        { id: string }
        & { __typename: 'Indicator' }
      ) }
      & { __typename: 'IndicatorCategoryRelationship' }
    )>, iconImage: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, urlPath: string, live: boolean }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ), attributes: Array<(
      { id: string, key: string }
      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, key: string }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )> }
    & { __typename: 'Category' }
  ) | null }
  & { __typename: 'Category' }
);

export type CategoryRecursiveFragment = (
  { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
    { id: string, name: string, namePlural: string | null }
    & { __typename: 'CategoryLevel' }
  ) | null, image: (
    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, rendition: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, indicators: Array<(
    { id: string, values: Array<(
      { id: string, date: string | null, value: number }
      & { __typename: 'IndicatorValue' }
    )>, goals: Array<(
      { id: string, date: string | null, value: number }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) }
    & { __typename: 'Indicator' }
  )>, indicatorRelationships: Array<(
    { id: string, type: IndicatorCategoryRelationshipType, indicator: (
      { id: string }
      & { __typename: 'Indicator' }
    ) }
    & { __typename: 'IndicatorCategoryRelationship' }
  )>, iconImage: (
    { id: string, rendition: (
      { id: string, src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, categoryPage: (
    { id: string | null, title: string, urlPath: string, live: boolean }
    & { __typename: 'CategoryPage' }
  ) | null, type: (
    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
    & { __typename: 'CategoryType' }
  ), attributes: Array<(
    { id: string, key: string }
    & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
  ) | (
    { value: string, id: string, key: string }
    & { __typename: 'AttributeRichText' | 'AttributeText' }
  )>, parent: (
    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, indicatorRelationships: Array<(
        { id: string, type: IndicatorCategoryRelationshipType, indicator: (
          { id: string }
          & { __typename: 'Indicator' }
        ) }
        & { __typename: 'IndicatorCategoryRelationship' }
      )>, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Category' }
    ) | null, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, indicators: Array<(
      { id: string, values: Array<(
        { id: string, date: string | null, value: number }
        & { __typename: 'IndicatorValue' }
      )>, goals: Array<(
        { id: string, date: string | null, value: number }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    )>, indicatorRelationships: Array<(
      { id: string, type: IndicatorCategoryRelationshipType, indicator: (
        { id: string }
        & { __typename: 'Indicator' }
      ) }
      & { __typename: 'IndicatorCategoryRelationship' }
    )>, iconImage: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, urlPath: string, live: boolean }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ), attributes: Array<(
      { id: string, key: string }
      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, key: string }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )> }
    & { __typename: 'Category' }
  ) | null }
  & { __typename: 'Category' }
);

export type CategoryHeroImagesFragment = (
  { id: string, image: (
    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, fullMedium: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, fullSmall: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, social: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, parent: (
    { id: string, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, fullMedium: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, fullSmall: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, social: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, parent: (
      { id: string, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, fullMedium: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, fullSmall: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, parent: (
        { id: string, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, fullMedium: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, fullSmall: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'Category' }
    ) | null }
    & { __typename: 'Category' }
  ) | null }
  & { __typename: 'Category' }
);

export type CategoryTagFragment = (
  { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, level: (
    { id: string, name: string, namePlural: string | null }
    & { __typename: 'CategoryLevel' }
  ) | null, iconImage: (
    { id: string, rendition: (
      { id: string, src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, categoryPage: (
    { id: string | null, title: string, urlPath: string, live: boolean }
    & { __typename: 'CategoryPage' }
  ) | null, type: (
    { id: string, name: string, identifier: string, hideCategoryIdentifiers: boolean, helpText: string, levels: Array<(
      { id: string, order: number, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    )> }
    & { __typename: 'CategoryType' }
  ) }
  & { __typename: 'Category' }
);

export type CategoryTagWithParentsFragment = (
  { id: string, parent: (
    { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, parent: (
      { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, parent: (
        { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, name: string, identifier: string, hideCategoryIdentifiers: boolean, helpText: string, levels: Array<(
            { id: string, order: number, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          )> }
          & { __typename: 'CategoryType' }
        ) }
        & { __typename: 'Category' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, name: string, identifier: string, hideCategoryIdentifiers: boolean, helpText: string, levels: Array<(
          { id: string, order: number, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        )> }
        & { __typename: 'CategoryType' }
      ) }
      & { __typename: 'Category' }
    ) | null, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, iconImage: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, urlPath: string, live: boolean }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, name: string, identifier: string, hideCategoryIdentifiers: boolean, helpText: string, levels: Array<(
        { id: string, order: number, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      )> }
      & { __typename: 'CategoryType' }
    ) }
    & { __typename: 'Category' }
  ) | null }
  & { __typename: 'Category' }
);

export type CategoryTagRecursiveFragment = (
  { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, level: (
    { id: string, name: string, namePlural: string | null }
    & { __typename: 'CategoryLevel' }
  ) | null, iconImage: (
    { id: string, rendition: (
      { id: string, src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, categoryPage: (
    { id: string | null, title: string, urlPath: string, live: boolean }
    & { __typename: 'CategoryPage' }
  ) | null, type: (
    { id: string, name: string, identifier: string, hideCategoryIdentifiers: boolean, helpText: string, levels: Array<(
      { id: string, order: number, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    )> }
    & { __typename: 'CategoryType' }
  ), parent: (
    { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, parent: (
      { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, parent: (
        { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, name: string, identifier: string, hideCategoryIdentifiers: boolean, helpText: string, levels: Array<(
            { id: string, order: number, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          )> }
          & { __typename: 'CategoryType' }
        ) }
        & { __typename: 'Category' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, name: string, identifier: string, hideCategoryIdentifiers: boolean, helpText: string, levels: Array<(
          { id: string, order: number, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        )> }
        & { __typename: 'CategoryType' }
      ) }
      & { __typename: 'Category' }
    ) | null, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, iconImage: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, urlPath: string, live: boolean }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, name: string, identifier: string, hideCategoryIdentifiers: boolean, helpText: string, levels: Array<(
        { id: string, order: number, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      )> }
      & { __typename: 'CategoryType' }
    ) }
    & { __typename: 'Category' }
  ) | null }
  & { __typename: 'Category' }
);

export type DashboardIndicatorBlockFragment = (
  { id: string | null, blockType: string, blocks: Array<(
    { blockType: string }
    & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ChoiceBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'ContinuousActionFilterBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
  ) | (
    { text: string | null, blockType: string }
    & { __typename: 'DashboardHeaderBlock' | 'DashboardParagraphBlock' }
  ) | (
    { id: string | null, helpText: string | null, blockType: string, showTotalLine: boolean | null, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null, dimension: (
      { id: string, name: string, categories: Array<(
        { id: string, name: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'Dimension' }
    ) | null, chartSeries: Array<(
      { dimensionCategory: (
        { id: string, name: string, defaultColor: string }
        & { __typename: 'DimensionCategory' }
      ) | null, values: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null> }
      & { __typename: 'DashboardIndicatorChartSeries' }
    ) | null> | null }
    & { __typename: 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorLineChartBlock' }
  ) | (
    { id: string | null, helpText: string | null, blockType: string, barType: string | null, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null, dimension: (
      { id: string, name: string, categories: Array<(
        { id: string, name: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'Dimension' }
    ) | null, chartSeries: Array<(
      { dimensionCategory: (
        { id: string, name: string, defaultColor: string }
        & { __typename: 'DimensionCategory' }
      ) | null, values: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null> }
      & { __typename: 'DashboardIndicatorChartSeries' }
    ) | null> | null }
    & { __typename: 'DashboardIndicatorBarChartBlock' }
  ) | (
    { helpText: string | null, blockType: string, year: number | null, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null, dimension: (
      { id: string, name: string, categories: Array<(
        { id: string, name: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'Dimension' }
    ) | null, chartSeries: Array<(
      { dimensionCategory: (
        { id: string, name: string, defaultColor: string }
        & { __typename: 'DimensionCategory' }
      ) | null, values: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null> }
      & { __typename: 'DashboardIndicatorChartSeries' }
    ) | null> | null }
    & { __typename: 'DashboardIndicatorPieChartBlock' }
  ) | (
    { id: string | null, blockType: string, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null }
    & { __typename: 'DashboardIndicatorSummaryBlock' }
  )> }
  & { __typename: 'DashboardRowBlock' }
);

export type DashboardIndicatorFragment = (
  { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
    { id: string, value: number, date: string | null }
    & { __typename: 'IndicatorValue' }
  ) | null, goals: Array<(
    { id: string, value: number, date: string | null }
    & { __typename: 'IndicatorGoal' }
  ) | null> | null, unit: (
    { id: string, name: string, shortName: string | null }
    & { __typename: 'Unit' }
  ) }
  & { __typename: 'Indicator' }
);

export type ChartDimensionFragment = (
  { id: string, name: string, categories: Array<(
    { id: string, name: string }
    & { __typename: 'DimensionCategory' }
  )> }
  & { __typename: 'Dimension' }
);

export type ChartSeriesFragment = (
  { dimensionCategory: (
    { id: string, name: string, defaultColor: string }
    & { __typename: 'DimensionCategory' }
  ) | null, values: Array<(
    { id: string, value: number, date: string | null }
    & { __typename: 'IndicatorValue' }
  ) | null> }
  & { __typename: 'DashboardIndicatorChartSeries' }
);

type BarChartVisualization_DashboardIndicatorBarChartBlock_Fragment = (
  { barType: string | null, indicator: (
    { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null, goals: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) }
    & { __typename: 'Indicator' }
  ) | null, dimension: (
    { id: string, name: string, categories: Array<(
      { id: string, name: string }
      & { __typename: 'DimensionCategory' }
    )> }
    & { __typename: 'Dimension' }
  ) | null, chartSeries: Array<(
    { dimensionCategory: (
      { id: string, name: string, defaultColor: string }
      & { __typename: 'DimensionCategory' }
    ) | null, values: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null> }
    & { __typename: 'DashboardIndicatorChartSeries' }
  ) | null> | null }
  & { __typename: 'DashboardIndicatorBarChartBlock' }
);

type BarChartVisualization_IndicatorDefaultBarChart_Fragment = (
  { barType: string | null, indicator: (
    { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null, goals: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) }
    & { __typename: 'Indicator' }
  ), dimension: (
    { id: string, name: string, categories: Array<(
      { id: string, name: string }
      & { __typename: 'DimensionCategory' }
    )> }
    & { __typename: 'Dimension' }
  ) | null, chartSeries: Array<(
    { dimensionCategory: (
      { id: string, name: string, defaultColor: string }
      & { __typename: 'DimensionCategory' }
    ) | null, values: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null> }
    & { __typename: 'DashboardIndicatorChartSeries' }
  )> }
  & { __typename: 'IndicatorDefaultBarChart' }
);

export type BarChartVisualizationFragment = BarChartVisualization_DashboardIndicatorBarChartBlock_Fragment | BarChartVisualization_IndicatorDefaultBarChart_Fragment;

type LineChartVisualization_DashboardIndicatorLineChartBlock_Fragment = (
  { showTotalLine: boolean | null, indicator: (
    { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null, goals: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) }
    & { __typename: 'Indicator' }
  ) | null, dimension: (
    { id: string, name: string, categories: Array<(
      { id: string, name: string }
      & { __typename: 'DimensionCategory' }
    )> }
    & { __typename: 'Dimension' }
  ) | null, chartSeries: Array<(
    { dimensionCategory: (
      { id: string, name: string, defaultColor: string }
      & { __typename: 'DimensionCategory' }
    ) | null, values: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null> }
    & { __typename: 'DashboardIndicatorChartSeries' }
  ) | null> | null }
  & { __typename: 'DashboardIndicatorLineChartBlock' }
);

type LineChartVisualization_IndicatorDefaultLineChart_Fragment = (
  { showTotalLine: boolean | null, indicator: (
    { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null, goals: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) }
    & { __typename: 'Indicator' }
  ), dimension: (
    { id: string, name: string, categories: Array<(
      { id: string, name: string }
      & { __typename: 'DimensionCategory' }
    )> }
    & { __typename: 'Dimension' }
  ) | null, chartSeries: Array<(
    { dimensionCategory: (
      { id: string, name: string, defaultColor: string }
      & { __typename: 'DimensionCategory' }
    ) | null, values: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null> }
    & { __typename: 'DashboardIndicatorChartSeries' }
  )> }
  & { __typename: 'IndicatorDefaultLineChart' }
);

export type LineChartVisualizationFragment = LineChartVisualization_DashboardIndicatorLineChartBlock_Fragment | LineChartVisualization_IndicatorDefaultLineChart_Fragment;

type AreaChartVisualization_DashboardIndicatorAreaChartBlock_Fragment = (
  { showTotalLine: boolean | null, indicator: (
    { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null, goals: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) }
    & { __typename: 'Indicator' }
  ) | null, dimension: (
    { id: string, name: string, categories: Array<(
      { id: string, name: string }
      & { __typename: 'DimensionCategory' }
    )> }
    & { __typename: 'Dimension' }
  ) | null, chartSeries: Array<(
    { dimensionCategory: (
      { id: string, name: string, defaultColor: string }
      & { __typename: 'DimensionCategory' }
    ) | null, values: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null> }
    & { __typename: 'DashboardIndicatorChartSeries' }
  ) | null> | null }
  & { __typename: 'DashboardIndicatorAreaChartBlock' }
);

type AreaChartVisualization_IndicatorDefaultAreaChart_Fragment = (
  { showTotalLine: boolean | null, indicator: (
    { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null, goals: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) }
    & { __typename: 'Indicator' }
  ), dimension: (
    { id: string, name: string, categories: Array<(
      { id: string, name: string }
      & { __typename: 'DimensionCategory' }
    )> }
    & { __typename: 'Dimension' }
  ) | null, chartSeries: Array<(
    { dimensionCategory: (
      { id: string, name: string, defaultColor: string }
      & { __typename: 'DimensionCategory' }
    ) | null, values: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null> }
    & { __typename: 'DashboardIndicatorChartSeries' }
  )> }
  & { __typename: 'IndicatorDefaultAreaChart' }
);

export type AreaChartVisualizationFragment = AreaChartVisualization_DashboardIndicatorAreaChartBlock_Fragment | AreaChartVisualization_IndicatorDefaultAreaChart_Fragment;

type PieChartVisualization_DashboardIndicatorPieChartBlock_Fragment = (
  { year: number | null, indicator: (
    { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null, goals: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) }
    & { __typename: 'Indicator' }
  ) | null, dimension: (
    { id: string, name: string, categories: Array<(
      { id: string, name: string }
      & { __typename: 'DimensionCategory' }
    )> }
    & { __typename: 'Dimension' }
  ) | null, chartSeries: Array<(
    { dimensionCategory: (
      { id: string, name: string, defaultColor: string }
      & { __typename: 'DimensionCategory' }
    ) | null, values: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null> }
    & { __typename: 'DashboardIndicatorChartSeries' }
  ) | null> | null }
  & { __typename: 'DashboardIndicatorPieChartBlock' }
);

type PieChartVisualization_IndicatorDefaultPieChart_Fragment = (
  { year: number | null, indicator: (
    { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null, goals: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) }
    & { __typename: 'Indicator' }
  ), dimension: (
    { id: string, name: string, categories: Array<(
      { id: string, name: string }
      & { __typename: 'DimensionCategory' }
    )> }
    & { __typename: 'Dimension' }
  ) | null, chartSeries: Array<(
    { dimensionCategory: (
      { id: string, name: string, defaultColor: string }
      & { __typename: 'DimensionCategory' }
    ) | null, values: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null> }
    & { __typename: 'DashboardIndicatorChartSeries' }
  )> }
  & { __typename: 'IndicatorDefaultPieChart' }
);

export type PieChartVisualizationFragment = PieChartVisualization_DashboardIndicatorPieChartBlock_Fragment | PieChartVisualization_IndicatorDefaultPieChart_Fragment;

type SummaryVisualization_DashboardIndicatorSummaryBlock_Fragment = (
  { indicator: (
    { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null, goals: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) }
    & { __typename: 'Indicator' }
  ) | null }
  & { __typename: 'DashboardIndicatorSummaryBlock' }
);

type SummaryVisualization_IndicatorDefaultSummary_Fragment = (
  { indicator: (
    { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null, goals: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) }
    & { __typename: 'Indicator' }
  ) }
  & { __typename: 'IndicatorDefaultSummary' }
);

export type SummaryVisualizationFragment = SummaryVisualization_DashboardIndicatorSummaryBlock_Fragment | SummaryVisualization_IndicatorDefaultSummary_Fragment;

export type IndicatorListIndicatorFragment = (
  { id: string, name: string, timeResolution: IndicatorTimeResolution, desiredTrend: IndicatorDesiredTrend | null, valueRounding: number | null, sortKey: string | null, nonQuantifiedGoal: IndicatorNonQuantifiedGoal | null, nonQuantifiedGoalDate: string | null, organization: (
    { id: string, name: string }
    & { __typename: 'Organization' }
  ), common: (
    { id: string, name: string, normalizations: Array<(
      { unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ), normalizer: (
        { name: string, id: string, identifier: string | null }
        & { __typename: 'CommonIndicator' }
      ) }
      & { __typename: 'CommonIndicatorNormalization' }
    )>, relatedCauses: Array<(
      { id: string, effectType: RelatedCommonIndicatorEffectType, causalIndicator: (
        { id: string }
        & { __typename: 'CommonIndicator' }
      ) }
      & { __typename: 'RelatedCommonIndicator' }
    )>, relatedEffects: Array<(
      { id: string, effectType: RelatedCommonIndicatorEffectType, effectIndicator: (
        { id: string }
        & { __typename: 'CommonIndicator' }
      ) }
      & { __typename: 'RelatedCommonIndicator' }
    )> }
    & { __typename: 'CommonIndicator' }
  ) | null, categories: Array<(
    { id: string, name: string, color: string, parent: (
      { id: string, name: string, color: string, level: (
        { id: string }
        & { __typename: 'CategoryLevel' }
      ) | null }
      & { __typename: 'Category' }
    ) | null, type: (
      { id: string, identifier: string }
      & { __typename: 'CategoryType' }
    ), level: (
      { id: string }
      & { __typename: 'CategoryLevel' }
    ) | null, common: (
      { id: string, type: (
        { name: string, identifier: string }
        & { __typename: 'CommonCategoryType' }
      ) }
      & { __typename: 'CommonCategory' }
    ) | null }
    & { __typename: 'Category' }
  )>, latestValue: (
    { id: string, date: string | null, value: number, normalizedValues: Array<(
      { normalizerId: string | null, value: number | null }
      & { __typename: 'NormalizedValue' }
    )> }
    & { __typename: 'IndicatorValue' }
  ) | null, referenceValue: (
    { id: string, date: string | null, value: number, normalizedValues: Array<(
      { normalizerId: string | null, value: number | null }
      & { __typename: 'NormalizedValue' }
    )> }
    & { __typename: 'IndicatorValue' }
  ) | null, dimensions: Array<(
    { id: string, dimension: (
      { id: string, name: string, categories: Array<(
        { id: string, name: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'Dimension' }
    ) }
    & { __typename: 'IndicatorDimension' }
  )>, values: Array<(
    { id: string, date: string | null, value: number, normalizedValues: Array<(
      { normalizerId: string | null, value: number | null }
      & { __typename: 'NormalizedValue' }
    )>, categories: Array<(
      { id: string }
      & { __typename: 'DimensionCategory' }
    )> }
    & { __typename: 'IndicatorValue' }
  )>, goals: Array<(
    { id: string, date: string | null, value: number, normalizedValues: Array<(
      { normalizerId: string | null, value: number | null }
      & { __typename: 'NormalizedValue' }
    )>, scenario: (
      { id: string }
      & { __typename: 'Scenario' }
    ) | null }
    & { __typename: 'IndicatorGoal' }
  ) | null> | null, unit: (
    { id: string, name: string, shortName: string | null }
    & { __typename: 'Unit' }
  ), plans: Array<(
    { id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null }
    & { __typename: 'Plan' }
  )> }
  & { __typename: 'Indicator' }
);

type IndicatorListFilter_GxIqRAgfSioH07e0TsixWfsi2QkOwIkCdae4INdPti_Fragment = (
  { field: string }
  & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
);

type IndicatorListFilter_Lrr2Fl8Se3u5PeLKw5dI21X2VgwGptdIrN1YaLxh00_Fragment = (
  { field: string }
  & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' }
);

type IndicatorListFilter_RW7qjqgUIhmn6IyoKftiuvtxd9SMsIrTrngnYOa6Y_Fragment = (
  { field: string }
  & { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' }
);

type IndicatorListFilter_2OJsJfLwOzefNptu26gJHjIoFrdZxvZ2Sxs1WXlVaa_Fragment = (
  { field: string }
  & { __typename: 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroAdditionalSettingsBlock' }
);

type IndicatorListFilter_DqRgBrgljvJbl3WFgdZ90H5aeFhIgHmxQr6ZkJuRfi_Fragment = (
  { field: string }
  & { __typename: 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' }
);

type IndicatorListFilter_GY48SSoofm1rvXj9jyzBpf76xfYsiVivx7tfisBtsq_Fragment = (
  { field: string }
  & { __typename: 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' }
);

type IndicatorListFilter_Lrouw9qstEv7at2T03PhLjf0F2pTzY6NfuTZsZyZGs_Fragment = (
  { field: string }
  & { __typename: 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
);

type IndicatorListFilter_CategoryTypeFilterBlock_Fragment = (
  { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
    { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
      { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
        { id: string }
        & { __typename: 'Category' }
      ) | null, common: (
        { id: string }
        & { __typename: 'CommonCategory' }
      ) | null }
      & { __typename: 'Category' }
    )> }
    & { __typename: 'CategoryType' }
  ) | null }
  & { __typename: 'CategoryTypeFilterBlock' }
);

type IndicatorListFilter_IndicatorFilterBlock_Fragment = (
  { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, sourceField: IndicatorList_FiltersFieldName | null, field: string }
  & { __typename: 'IndicatorFilterBlock' }
);

export type IndicatorListFilterFragment = IndicatorListFilter_GxIqRAgfSioH07e0TsixWfsi2QkOwIkCdae4INdPti_Fragment | IndicatorListFilter_Lrr2Fl8Se3u5PeLKw5dI21X2VgwGptdIrN1YaLxh00_Fragment | IndicatorListFilter_RW7qjqgUIhmn6IyoKftiuvtxd9SMsIrTrngnYOa6Y_Fragment | IndicatorListFilter_2OJsJfLwOzefNptu26gJHjIoFrdZxvZ2Sxs1WXlVaa_Fragment | IndicatorListFilter_DqRgBrgljvJbl3WFgdZ90H5aeFhIgHmxQr6ZkJuRfi_Fragment | IndicatorListFilter_GY48SSoofm1rvXj9jyzBpf76xfYsiVivx7tfisBtsq_Fragment | IndicatorListFilter_Lrouw9qstEv7at2T03PhLjf0F2pTzY6NfuTZsZyZGs_Fragment | IndicatorListFilter_CategoryTypeFilterBlock_Fragment | IndicatorListFilter_IndicatorFilterBlock_Fragment;

export type IndicatorListPageFiltersFragment = (
  { id: string | null, primaryFilters: Array<(
    { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
          { id: string }
          & { __typename: 'Category' }
        ) | null, common: (
          { id: string }
          & { __typename: 'CommonCategory' }
        ) | null }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    ) | null }
    & { __typename: 'CategoryTypeFilterBlock' }
  ) | (
    { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, sourceField: IndicatorList_FiltersFieldName | null, field: string }
    & { __typename: 'IndicatorFilterBlock' }
  )> | null, mainFilters: Array<(
    { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
          { id: string }
          & { __typename: 'Category' }
        ) | null, common: (
          { id: string }
          & { __typename: 'CommonCategory' }
        ) | null }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    ) | null }
    & { __typename: 'CategoryTypeFilterBlock' }
  ) | (
    { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, sourceField: IndicatorList_FiltersFieldName | null, field: string }
    & { __typename: 'IndicatorFilterBlock' }
  )> | null, advancedFilters: Array<(
    { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
          { id: string }
          & { __typename: 'Category' }
        ) | null, common: (
          { id: string }
          & { __typename: 'CommonCategory' }
        ) | null }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    ) | null }
    & { __typename: 'CategoryTypeFilterBlock' }
  ) | (
    { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, sourceField: IndicatorList_FiltersFieldName | null, field: string }
    & { __typename: 'IndicatorFilterBlock' }
  )> | null }
  & { __typename: 'IndicatorListPage' }
);

export type IndicatorListPageFragment = (
  { id: string | null, slug: string, title: string, leadContent: string | null, displayInsights: boolean | null, displayLevel: boolean | null, includeRelatedPlans: boolean | null, listColumns: Array<(
    { id: string | null, columnLabel: string | null, columnHelpText: string | null, categoryType: (
      { id: string, name: string }
      & { __typename: 'CategoryType' }
    ), categoryLevel: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null }
    & { __typename: 'IndicatorCategoryColumn' }
  ) | (
    { id: string | null, columnLabel: string | null, columnHelpText: string | null, sourceField: IndicatorDashboardFieldName | null }
    & { __typename: 'IndicatorListColumn' }
  ) | (
    { id: string | null, columnLabel: string | null, columnHelpText: string | null, sourceField: IndicatorDashboardFieldName | null, isNormalized: boolean, valueType: IndicatorColumnValueType, defaultYear: number | null, hideUnit: boolean, highlightGoalMet: boolean }
    & { __typename: 'IndicatorValueColumn' }
  )> | null, primaryFilters: Array<(
    { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
          { id: string }
          & { __typename: 'Category' }
        ) | null, common: (
          { id: string }
          & { __typename: 'CommonCategory' }
        ) | null }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    ) | null }
    & { __typename: 'CategoryTypeFilterBlock' }
  ) | (
    { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, sourceField: IndicatorList_FiltersFieldName | null, field: string }
    & { __typename: 'IndicatorFilterBlock' }
  )> | null, mainFilters: Array<(
    { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
          { id: string }
          & { __typename: 'Category' }
        ) | null, common: (
          { id: string }
          & { __typename: 'CommonCategory' }
        ) | null }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    ) | null }
    & { __typename: 'CategoryTypeFilterBlock' }
  ) | (
    { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, sourceField: IndicatorList_FiltersFieldName | null, field: string }
    & { __typename: 'IndicatorFilterBlock' }
  )> | null, advancedFilters: Array<(
    { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
      { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
        { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
          { id: string }
          & { __typename: 'Category' }
        ) | null, common: (
          { id: string }
          & { __typename: 'CommonCategory' }
        ) | null }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    ) | null }
    & { __typename: 'CategoryTypeFilterBlock' }
  ) | (
    { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, sourceField: IndicatorList_FiltersFieldName | null, field: string }
    & { __typename: 'IndicatorFilterBlock' }
  )> | null }
  & { __typename: 'IndicatorListPage' }
);

type StreamField_AccessibilityStatementComplianceStatusBlock_AccessibilityStatementPreparationInformationBlock_Fragment = (
  { id: string | null, blockType: string, field: string }
  & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementPreparationInformationBlock' }
);

type StreamField_BkrAtuMbvIgq8dFh0NeSzC2YsDsdjMosGqoHq9EGlA_Fragment = (
  { blockType: string, field: string }
  & { __typename: 'AccessibilityStatementContactFormBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' }
);

type StreamField_Vx03wi0C1NuklaSMsHEefPBtA1oAwEm4G51Wzvm1Yu_Fragment = (
  { blockType: string, field: string }
  & { __typename: 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CategoryPageAttributeTypeBlock' }
);

type StreamField_FlMeoehsE4WDxxEsX1cUwyUxGzRevfkr04gZGeio_Fragment = (
  { blockType: string, field: string }
  & { __typename: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'ContinuousActionFilterBlock' | 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' }
);

type StreamField_AMec2wFjjsCmRIytRxHyitKs1KGqEcNcStNpc4xRg_Fragment = (
  { blockType: string, field: string }
  & { __typename: 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroAdditionalSettingsBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' }
);

type StreamField_M46Iqnp9o1poJczs1cJsLbePua9ZimVdkqWzZpmU_Fragment = (
  { blockType: string, field: string }
  & { __typename: 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsNodeSummaryBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' }
);

type StreamField_QYht5Q7TkrtFeXGhsFxUhmAbiHZruXkDn4xlKEeRu_Fragment = (
  { blockType: string, field: string }
  & { __typename: 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
);

type StreamField_AccessibilityStatementContactInformationBlock_Fragment = (
  { id: string | null, blockType: string, field: string, blocks: Array<(
    { field: string }
    & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
  ) | (
    { field: string }
    & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' }
  ) | (
    { field: string }
    & { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' }
  ) | (
    { field: string }
    & { __typename: 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroAdditionalSettingsBlock' }
  ) | (
    { field: string }
    & { __typename: 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' }
  ) | (
    { field: string }
    & { __typename: 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' }
  ) | (
    { field: string }
    & { __typename: 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
  ) | (
    { value: string, field: string }
    & { __typename: 'CharBlock' }
  )> }
  & { __typename: 'AccessibilityStatementContactInformationBlock' }
);

type StreamField_ActionCategoryFilterCardsBlock_Fragment = (
  { blockType: string, field: string, cards: Array<(
    { heading: string | null, lead: string | null, category: (
      { id: string, type: (
        { id: string, identifier: string }
        & { __typename: 'CategoryType' }
      ) }
      & { __typename: 'Category' }
    ) }
    & { __typename: 'ActionCategoryFilterCardBlock' }
  )> | null }
  & { __typename: 'ActionCategoryFilterCardsBlock' }
);

type StreamField_ActionListBlock_Fragment = (
  { id: string | null, heading: string | null, helpText: string | null, blockType: string, field: string, categoryFilter: (
    { id: string }
    & { __typename: 'Category' }
  ) | null, groupByCategoryLevel: (
    { id: string }
    & { __typename: 'CategoryLevel' }
  ) | null }
  & { __typename: 'ActionListBlock' }
);

type StreamField_AdaptiveEmbedBlock_Fragment = (
  { title: string | null, description: string | null, fullWidth: boolean | null, blockType: string, field: string, embed: (
    { html: string | null }
    & { __typename: 'EmbedHTMLValue' }
  ) | null }
  & { __typename: 'AdaptiveEmbedBlock' }
);

type StreamField_CardListBlock_Fragment = (
  { heading: string | null, lead: string | null, blockType: string, field: string, cards: Array<(
    { heading: string | null, content: string | null, link: string | null, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null }
    & { __typename: 'CardBlock' }
  )> | null }
  & { __typename: 'CardListBlock' }
);

type StreamField_CartographyVisualisationBlock_Fragment = (
  { styleOverrides: string | null, blockType: string, field: string, cartographyStyle: string | null, account: (
    { provider: CartographyProviderCredentialsProvider, account: string, publicAccessToken: string }
    & { __typename: 'CartographyProviderCredentials' }
  ) }
  & { __typename: 'CartographyVisualisationBlock' }
);

type StreamField_CategoryListBlock_Fragment = (
  { style: string | null, heading: string | null, lead: string | null, blockType: string, field: string, categoryType: (
    { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, indicatorRelationships: Array<(
        { id: string, type: IndicatorCategoryRelationshipType, indicator: (
          { id: string }
          & { __typename: 'Indicator' }
        ) }
        & { __typename: 'IndicatorCategoryRelationship' }
      )>, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )>, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'Category' }
    )> }
    & { __typename: 'CategoryType' }
  ) | null, category: (
    { id: string, children: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, indicatorRelationships: Array<(
        { id: string, type: IndicatorCategoryRelationshipType, indicator: (
          { id: string }
          & { __typename: 'Indicator' }
        ) }
        & { __typename: 'IndicatorCategoryRelationship' }
      )>, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Category' }
    )> }
    & { __typename: 'Category' }
  ) | null }
  & { __typename: 'CategoryListBlock' }
);

type StreamField_CategoryTreeMapBlock_Fragment = (
  { heading: string | null, lead: string | null, blockType: string, field: string, valueAttribute: (
    { id: string, identifier: string, unit: (
      { id: string, shortName: string | null }
      & { __typename: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ), treeMapCategoryType: (
    { id: string, identifier: string }
    & { __typename: 'CategoryType' }
  ) }
  & { __typename: 'CategoryTreeMapBlock' }
);

type StreamField_CategoryTypeLevelListBlock_Fragment = (
  { heading: string | null, helpText: string | null, pathsTargetNodeId: string | null, blockType: string, field: string, categoryLevel: (
    { id: string, name: string, namePlural: string | null }
    & { __typename: 'CategoryLevel' }
  ), groupByCategoryLevel: (
    { id: string }
    & { __typename: 'CategoryLevel' }
  ) | null, categoryBlockType: (
    { id: string, identifier: string, hideCategoryIdentifiers: boolean, categories: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, indicators: Array<(
        { id: string, name: string, values: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicatorRelationships: Array<(
        { id: string, type: IndicatorCategoryRelationshipType, indicator: (
          { id: string }
          & { __typename: 'Indicator' }
        ) }
        & { __typename: 'IndicatorCategoryRelationship' }
      )>, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )>, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'Category' }
    )> }
    & { __typename: 'CategoryType' }
  ) }
  & { __typename: 'CategoryTypeLevelListBlock' }
);

type StreamField_ChangeLogMessageBlock_Fragment = (
  { fieldLabel: string | null, fieldHelpText: string | null, blockType: string, field: string }
  & { __typename: 'ChangeLogMessageBlock' }
);

type StreamField_CharBlock_RichTextBlock_TextBlock_Fragment = (
  { value: string, blockType: string, field: string }
  & { __typename: 'CharBlock' | 'RichTextBlock' | 'TextBlock' }
);

type StreamField_ChoiceBlock_Fragment = (
  { value: string, blockType: string, field: string, choices: Array<(
    { key: string, value: string }
    & { __typename: 'ChoiceOption' }
  )> }
  & { __typename: 'ChoiceBlock' }
);

type StreamField_DashboardRowBlock_Fragment = (
  { blockType: string, field: string, id: string | null, blocks: Array<(
    { blockType: string }
    & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ChoiceBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'ContinuousActionFilterBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
  ) | (
    { text: string | null, blockType: string }
    & { __typename: 'DashboardHeaderBlock' | 'DashboardParagraphBlock' }
  ) | (
    { id: string | null, helpText: string | null, blockType: string, showTotalLine: boolean | null, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null, dimension: (
      { id: string, name: string, categories: Array<(
        { id: string, name: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'Dimension' }
    ) | null, chartSeries: Array<(
      { dimensionCategory: (
        { id: string, name: string, defaultColor: string }
        & { __typename: 'DimensionCategory' }
      ) | null, values: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null> }
      & { __typename: 'DashboardIndicatorChartSeries' }
    ) | null> | null }
    & { __typename: 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorLineChartBlock' }
  ) | (
    { id: string | null, helpText: string | null, blockType: string, barType: string | null, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null, dimension: (
      { id: string, name: string, categories: Array<(
        { id: string, name: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'Dimension' }
    ) | null, chartSeries: Array<(
      { dimensionCategory: (
        { id: string, name: string, defaultColor: string }
        & { __typename: 'DimensionCategory' }
      ) | null, values: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null> }
      & { __typename: 'DashboardIndicatorChartSeries' }
    ) | null> | null }
    & { __typename: 'DashboardIndicatorBarChartBlock' }
  ) | (
    { helpText: string | null, blockType: string, year: number | null, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null, dimension: (
      { id: string, name: string, categories: Array<(
        { id: string, name: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'Dimension' }
    ) | null, chartSeries: Array<(
      { dimensionCategory: (
        { id: string, name: string, defaultColor: string }
        & { __typename: 'DimensionCategory' }
      ) | null, values: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null> }
      & { __typename: 'DashboardIndicatorChartSeries' }
    ) | null> | null }
    & { __typename: 'DashboardIndicatorPieChartBlock' }
  ) | (
    { id: string | null, blockType: string, indicator: (
      { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { id: string, value: number, date: string | null }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    ) | null }
    & { __typename: 'DashboardIndicatorSummaryBlock' }
  )> }
  & { __typename: 'DashboardRowBlock' }
);

type StreamField_FrontPageHeroBlock_Fragment = (
  { layout: string, heading: string | null, lead: string | null, blockType: string, field: string, image: (
    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, fullMedium: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, fullSmall: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, additionalSettings: (
    { backgroundColour: string | null, fitImage: boolean | null, showImageAccent: boolean | null, backgroundCoversFullSection: boolean | null }
    & { __typename: 'FrontPageHeroAdditionalSettingsBlock' }
  ) | null }
  & { __typename: 'FrontPageHeroBlock' }
);

type StreamField_IndicatorBlock_Fragment = (
  { style: string | null, blockType: string, field: string, indicator: (
    { id: string }
    & { __typename: 'Indicator' }
  ) | null }
  & { __typename: 'IndicatorBlock' }
);

type StreamField_IndicatorGroupBlock_Fragment = (
  { title: string | null, blockType: string, field: string, indicators: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' } | { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ChoiceBlock' } | { __typename: 'ContinuousActionFilterBlock' | 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' } | { __typename: 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' } | { __typename: 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' } | { __typename: 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
    { style: string | null, indicator: (
      { id: string, identifier: string | null, name: string, description: string | null, timeResolution: IndicatorTimeResolution, level: string | null, unit: (
        { id: string, name: string }
        & { __typename: 'Unit' }
      ), latestValue: (
        { id: string, date: string | null, value: number }
        & { __typename: 'IndicatorValue' }
      ) | null, goals: Array<(
        { id: string, date: string | null, value: number }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null }
      & { __typename: 'Indicator' }
    ) | null }
    & { __typename: 'IndicatorBlock' }
  ) | null> | null }
  & { __typename: 'IndicatorGroupBlock' }
);

type StreamField_IndicatorShowcaseBlock_Fragment = (
  { title: string | null, body: string | null, significantDigits: number | null, indicatorIsNormalized: boolean | null, blockType: string, field: string, blocks: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' } | { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ChoiceBlock' } | { __typename: 'ContinuousActionFilterBlock' | 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' } | { __typename: 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' } | { __typename: 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' } | { __typename: 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }>, indicator: (
    { id: string, identifier: string | null, name: string, minValue: number | null, maxValue: number | null, unit: (
      { id: string, shortName: string | null, name: string }
      & { __typename: 'Unit' }
    ), latestValue: (
      { id: string, date: string | null, value: number }
      & { __typename: 'IndicatorValue' }
    ) | null, values: Array<(
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )>, categories: Array<(
        { id: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'IndicatorValue' }
    )>, goals: Array<(
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )> }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, common: (
      { id: string, normalizations: Array<(
        { unit: (
          { id: string, shortName: string | null, name: string }
          & { __typename: 'Unit' }
        ), normalizer: (
          { name: string, id: string, identifier: string | null }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'CommonIndicatorNormalization' }
      )> }
      & { __typename: 'CommonIndicator' }
    ) | null }
    & { __typename: 'Indicator' }
  ) | null, linkButton: (
    { blockType: string }
    & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ChoiceBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'ContinuousActionFilterBlock' | 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' }
  ) | (
    { blockType: string }
    & { __typename: 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
  ) | (
    { text: string | null, blockType: string, page: (
      { id: string | null, url: string | null, urlPath: string, slug: string }
      & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
    ) | null }
    & { __typename: 'PageLinkBlock' }
  ) | null }
  & { __typename: 'IndicatorShowcaseBlock' }
);

type StreamField_LargeImageBlock_Fragment = (
  { width: string | null, blockType: string, field: string, image: (
    { id: string, title: string, altText: string, width: number, height: number, imageCredit: string, renditionUncropped: (
      { id: string, src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null }
  & { __typename: 'LargeImageBlock' }
);

type StreamField_PathsOutcomeBlock_Fragment = (
  { heading: string | null, helpText: string | null, outcomeNodeId: string | null, blockType: string, field: string }
  & { __typename: 'PathsOutcomeBlock' }
);

type StreamField_QuestionAnswerBlock_Fragment = (
  { heading: string | null, blockType: string, field: string, questions: Array<(
    { question: string, answer: string }
    & { __typename: 'QuestionBlock' }
  )> | null }
  & { __typename: 'QuestionAnswerBlock' }
);

export type StreamFieldFragment = StreamField_AccessibilityStatementComplianceStatusBlock_AccessibilityStatementPreparationInformationBlock_Fragment | StreamField_BkrAtuMbvIgq8dFh0NeSzC2YsDsdjMosGqoHq9EGlA_Fragment | StreamField_Vx03wi0C1NuklaSMsHEefPBtA1oAwEm4G51Wzvm1Yu_Fragment | StreamField_FlMeoehsE4WDxxEsX1cUwyUxGzRevfkr04gZGeio_Fragment | StreamField_AMec2wFjjsCmRIytRxHyitKs1KGqEcNcStNpc4xRg_Fragment | StreamField_M46Iqnp9o1poJczs1cJsLbePua9ZimVdkqWzZpmU_Fragment | StreamField_QYht5Q7TkrtFeXGhsFxUhmAbiHZruXkDn4xlKEeRu_Fragment | StreamField_AccessibilityStatementContactInformationBlock_Fragment | StreamField_ActionCategoryFilterCardsBlock_Fragment | StreamField_ActionListBlock_Fragment | StreamField_AdaptiveEmbedBlock_Fragment | StreamField_CardListBlock_Fragment | StreamField_CartographyVisualisationBlock_Fragment | StreamField_CategoryListBlock_Fragment | StreamField_CategoryTreeMapBlock_Fragment | StreamField_CategoryTypeLevelListBlock_Fragment | StreamField_ChangeLogMessageBlock_Fragment | StreamField_CharBlock_RichTextBlock_TextBlock_Fragment | StreamField_ChoiceBlock_Fragment | StreamField_DashboardRowBlock_Fragment | StreamField_FrontPageHeroBlock_Fragment | StreamField_IndicatorBlock_Fragment | StreamField_IndicatorGroupBlock_Fragment | StreamField_IndicatorShowcaseBlock_Fragment | StreamField_LargeImageBlock_Fragment | StreamField_PathsOutcomeBlock_Fragment | StreamField_QuestionAnswerBlock_Fragment;

export type ActionDetailsQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  clientUrl: Scalars['String']['input'];
  workflow: InputMaybe<WorkflowState>;
}>;


export type ActionDetailsQuery = (
  { action: (
    { id: string, identifier: string, name: string, officialName: string | null, leadParagraph: string, description: string | null, completion: number | null, color: string | null, updatedAt: string, manualStatusReason: string | null, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, dateFormat: ActionDateFormat | null, workflowStatus: (
      { matchingVersion: (
        { id: string, description: string | null }
        & { __typename: 'WorkflowStateDescription' }
      ) | null }
      & { __typename: 'WorkflowInfoNode' }
    ) | null, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, fullMedium: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, fullSmall: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, social: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, statusSummary: (
      { identifier: ActionStatusSummaryIdentifier, label: string, sentiment: Sentiment, isCompleted: boolean, isActive: boolean }
      & { __typename: 'ActionStatusSummary' }
    ), links: Array<(
      { id: string, order: number, url: string, title: string }
      & { __typename: 'ActionLink' }
    )>, mergedActions: Array<(
      { id: string, identifier: string, name: string, officialName: string | null, plan: (
        { id: string, viewUrl: string | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    )>, categories: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, fullMedium: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, fullSmall: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, fullMedium: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, fullSmall: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, fullMedium: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, fullSmall: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, social: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, fullMedium: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, fullSmall: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, social: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, indicatorRelationships: Array<(
        { id: string, type: IndicatorCategoryRelationshipType, indicator: (
          { id: string }
          & { __typename: 'Indicator' }
        ) }
        & { __typename: 'IndicatorCategoryRelationship' }
      )>, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Category' }
    )>, emissionScopes: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string }
      & { __typename: 'Category' }
    )>, contactPersons: Array<(
      { id: string, person: (
        { id: string, firstName: string, lastName: string, avatarUrl: string | null, title: string | null, organization: (
          { id: string, name: string }
          & { __typename: 'Organization' }
        ) }
        & { __typename: 'Person' }
      ) }
      & { __typename: 'ActionContactPerson' }
    )>, primaryOrg: (
      { id: string, abbreviation: string | null, name: string, logo: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Organization' }
    ) | null, responsibleParties: Array<(
      { id: string, role: ActionResponsiblePartyRole | null, specifier: string, organization: (
        { id: string, abbreviation: string | null, name: string, email: string }
        & { __typename: 'Organization' }
      ) }
      & { __typename: 'ActionResponsibleParty' }
    )>, tasks: Array<(
      { id: string, name: string, dueAt: string, dateFormat: ActionTaskDateFormat | null, completedAt: string | null, details: string | null, state: ActionTaskState }
      & { __typename: 'ActionTask' }
    )>, status: (
      { id: string, identifier: string, name: string, color: string }
      & { __typename: 'ActionStatus' }
    ) | null, implementationPhase: (
      { id: string, identifier: string, name: string }
      & { __typename: 'ActionImplementationPhase' }
    ) | null, schedule: Array<(
      { id: string, name: string, beginsAt: string, endsAt: string | null }
      & { __typename: 'ActionSchedule' }
    )>, impact: (
      { id: string, identifier: string, name: string }
      & { __typename: 'ActionImpact' }
    ) | null, statusUpdates: Array<(
      { id: string }
      & { __typename: 'ActionStatusUpdate' }
    )>, relatedIndicators: Array<(
      { id: string, indicatesActionProgress: boolean, indicator: (
        { id: string, name: string, latestGraph: (
          { id: string }
          & { __typename: 'IndicatorGraph' }
        ) | null, latestValue: (
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        ) | null, actions: Array<(
          { id: string, identifier: string, name: string }
          & { __typename: 'Action' }
        )>, plans: Array<(
          { id: string }
          & { __typename: 'Plan' }
        )>, defaultVisualization: (
          { showTotalLine: boolean | null, indicator: (
            { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
              { id: string, value: number, date: string | null }
              & { __typename: 'IndicatorValue' }
            ) | null, goals: Array<(
              { id: string, value: number, date: string | null }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          ), dimension: (
            { id: string, name: string, categories: Array<(
              { id: string, name: string }
              & { __typename: 'DimensionCategory' }
            )> }
            & { __typename: 'Dimension' }
          ) | null, chartSeries: Array<(
            { dimensionCategory: (
              { id: string, name: string, defaultColor: string }
              & { __typename: 'DimensionCategory' }
            ) | null, values: Array<(
              { id: string, value: number, date: string | null }
              & { __typename: 'IndicatorValue' }
            ) | null> }
            & { __typename: 'DashboardIndicatorChartSeries' }
          )> }
          & { __typename: 'IndicatorDefaultAreaChart' | 'IndicatorDefaultLineChart' }
        ) | (
          { barType: string | null, indicator: (
            { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
              { id: string, value: number, date: string | null }
              & { __typename: 'IndicatorValue' }
            ) | null, goals: Array<(
              { id: string, value: number, date: string | null }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          ), dimension: (
            { id: string, name: string, categories: Array<(
              { id: string, name: string }
              & { __typename: 'DimensionCategory' }
            )> }
            & { __typename: 'Dimension' }
          ) | null, chartSeries: Array<(
            { dimensionCategory: (
              { id: string, name: string, defaultColor: string }
              & { __typename: 'DimensionCategory' }
            ) | null, values: Array<(
              { id: string, value: number, date: string | null }
              & { __typename: 'IndicatorValue' }
            ) | null> }
            & { __typename: 'DashboardIndicatorChartSeries' }
          )> }
          & { __typename: 'IndicatorDefaultBarChart' }
        ) | (
          { year: number | null, indicator: (
            { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
              { id: string, value: number, date: string | null }
              & { __typename: 'IndicatorValue' }
            ) | null, goals: Array<(
              { id: string, value: number, date: string | null }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          ), dimension: (
            { id: string, name: string, categories: Array<(
              { id: string, name: string }
              & { __typename: 'DimensionCategory' }
            )> }
            & { __typename: 'Dimension' }
          ) | null, chartSeries: Array<(
            { dimensionCategory: (
              { id: string, name: string, defaultColor: string }
              & { __typename: 'DimensionCategory' }
            ) | null, values: Array<(
              { id: string, value: number, date: string | null }
              & { __typename: 'IndicatorValue' }
            ) | null> }
            & { __typename: 'DashboardIndicatorChartSeries' }
          )> }
          & { __typename: 'IndicatorDefaultPieChart' }
        ) | (
          { indicator: (
            { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
              { id: string, value: number, date: string | null }
              & { __typename: 'IndicatorValue' }
            ) | null, goals: Array<(
              { id: string, value: number, date: string | null }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorDefaultSummary' }
        ) | null }
        & { __typename: 'Indicator' }
      ) }
      & { __typename: 'ActionIndicator' }
    )>, relatedActions: Array<(
      { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, status: (
        { id: string, identifier: string, name: string, color: string }
        & { __typename: 'ActionStatus' }
      ) | null, categories: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )>, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      )>, statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename: 'ActionStatusSummary' }
      ), implementationPhase: (
        { id: string, identifier: string, name: string }
        & { __typename: 'ActionImplementationPhase' }
      ) | null, primaryOrg: (
        { id: string, abbreviation: string | null, name: string, logo: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Organization' }
      ) | null, mergedWith: (
        { id: string, identifier: string, viewUrl: string, plan: (
          { id: string, shortName: string | null, name: string, versionName: string, viewUrl: string | null }
          & { __typename: 'Plan' }
        ) }
        & { __typename: 'Action' }
      ) | null, plan: (
        { id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    )>, mergedWith: (
      { id: string, identifier: string, plan: (
        { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ) | null, supersededBy: (
      { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, status: (
        { id: string, identifier: string, name: string, color: string }
        & { __typename: 'ActionStatus' }
      ) | null, categories: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )>, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      )>, statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename: 'ActionStatusSummary' }
      ), implementationPhase: (
        { id: string, identifier: string, name: string }
        & { __typename: 'ActionImplementationPhase' }
      ) | null, primaryOrg: (
        { id: string, abbreviation: string | null, name: string, logo: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Organization' }
      ) | null, mergedWith: (
        { id: string, identifier: string, viewUrl: string, plan: (
          { id: string, shortName: string | null, name: string, versionName: string, viewUrl: string | null }
          & { __typename: 'Plan' }
        ) }
        & { __typename: 'Action' }
      ) | null, plan: (
        { id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ) | null, supersededActions: Array<(
      { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, status: (
        { id: string, identifier: string, name: string, color: string }
        & { __typename: 'ActionStatus' }
      ) | null, categories: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )>, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      )>, statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename: 'ActionStatusSummary' }
      ), implementationPhase: (
        { id: string, identifier: string, name: string }
        & { __typename: 'ActionImplementationPhase' }
      ) | null, primaryOrg: (
        { id: string, abbreviation: string | null, name: string, logo: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Organization' }
      ) | null, mergedWith: (
        { id: string, identifier: string, viewUrl: string, plan: (
          { id: string, shortName: string | null, name: string, versionName: string, viewUrl: string | null }
          & { __typename: 'Plan' }
        ) }
        & { __typename: 'Action' }
      ) | null, plan: (
        { id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    )>, nextAction: (
      { id: string, identifier: string }
      & { __typename: 'Action' }
    ) | null, previousAction: (
      { id: string, identifier: string }
      & { __typename: 'Action' }
    ) | null, attributes: Array<(
      { id: string, categories: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )>, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      )>, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeCategoryChoice' }
    ) | (
      { text: string | null, id: string, choice: (
        { id: string, identifier: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      ) | null, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeChoice' }
    ) | (
      { id: string, numericValue: number, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )>, changeLogMessage: (
      { content: string | null, updatedAt: string | null, createdBy: (
        { id: string, firstName: string, lastName: string, avatarUrl: string | null }
        & { __typename: 'Person' }
      ) | null }
      & { __typename: 'ActionChangeLogMessage' | 'CategoryChangeLogMessage' | 'IndicatorChangeLogMessage' | 'PageChangeLogMessage' }
    ) | null, pledges: Array<(
      { id: string, name: string, description: string, slug: string, commitmentCount: number, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, attributes: Array<(
        { id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, indicatorRelationships: Array<(
                  { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                    { id: string }
                    & { __typename: 'Indicator' }
                  ) }
                  & { __typename: 'IndicatorCategoryRelationship' }
                )>, iconImage: (
                  { id: string, rendition: (
                    { id: string, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'AttributeCategoryChoice' }
      ) | (
        { text: string | null, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), choice: (
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        ) | null }
        & { __typename: 'AttributeChoice' }
      ) | (
        { id: string, numericValue: number, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Pledge' }
    )>, datasets: Array<(
      { uuid: string, schema: (
        { uuid: string, name: string, timeResolution: string, metrics: Array<(
          { unit: string }
          & { __typename: 'DatasetMetricNode' }
        )>, dimensions: Array<(
          { order: number, dimension: (
            { name: string, uuid: string, categories: Array<(
              { uuid: string, label: string }
              & { __typename: 'DatasetsDimensionCategory' }
            )> }
            & { __typename: 'DatasetsDimension' }
          ) }
          & { __typename: 'DatasetSchemaDimension' }
        )> }
        & { __typename: 'DatasetSchema' }
      ) | null, dataPoints: Array<(
        { uuid: string, value: number | null, date: string, dimensionCategories: Array<(
          { uuid: string, label: string, dimension: (
            { uuid: string }
            & { __typename: 'DatasetsDimension' }
          ) }
          & { __typename: 'DatasetsDimensionCategory' }
        )> }
        & { __typename: 'DataPoint' }
      )> }
      & { __typename: 'Dataset' }
    )>, plan: (
      { id: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, image: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Plan' }
    ), dependencyRole: (
      { id: string, name: string }
      & { __typename: 'ActionDependencyRole' }
    ) | null, allDependencyRelationships: Array<(
      { id: string, preceding: (
        { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, dependencyRole: (
          { id: string, name: string }
          & { __typename: 'ActionDependencyRole' }
        ) | null, status: (
          { id: string, identifier: string, name: string, color: string }
          & { __typename: 'ActionStatus' }
        ) | null, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, indicatorRelationships: Array<(
                  { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                    { id: string }
                    & { __typename: 'Indicator' }
                  ) }
                  & { __typename: 'IndicatorCategoryRelationship' }
                )>, iconImage: (
                  { id: string, rendition: (
                    { id: string, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )>, statusSummary: (
          { identifier: ActionStatusSummaryIdentifier }
          & { __typename: 'ActionStatusSummary' }
        ), implementationPhase: (
          { id: string, identifier: string, name: string }
          & { __typename: 'ActionImplementationPhase' }
        ) | null, primaryOrg: (
          { id: string, abbreviation: string | null, name: string, logo: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Organization' }
        ) | null, mergedWith: (
          { id: string, identifier: string, viewUrl: string, plan: (
            { id: string, shortName: string | null, name: string, versionName: string, viewUrl: string | null }
            & { __typename: 'Plan' }
          ) }
          & { __typename: 'Action' }
        ) | null, plan: (
          { id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Plan' }
        ) }
        & { __typename: 'Action' }
      ), dependent: (
        { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, dependencyRole: (
          { id: string, name: string }
          & { __typename: 'ActionDependencyRole' }
        ) | null, status: (
          { id: string, identifier: string, name: string, color: string }
          & { __typename: 'ActionStatus' }
        ) | null, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, indicatorRelationships: Array<(
                  { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                    { id: string }
                    & { __typename: 'Indicator' }
                  ) }
                  & { __typename: 'IndicatorCategoryRelationship' }
                )>, iconImage: (
                  { id: string, rendition: (
                    { id: string, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )>, statusSummary: (
          { identifier: ActionStatusSummaryIdentifier }
          & { __typename: 'ActionStatusSummary' }
        ), implementationPhase: (
          { id: string, identifier: string, name: string }
          & { __typename: 'ActionImplementationPhase' }
        ) | null, primaryOrg: (
          { id: string, abbreviation: string | null, name: string, logo: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Organization' }
        ) | null, mergedWith: (
          { id: string, identifier: string, viewUrl: string, plan: (
            { id: string, shortName: string | null, name: string, versionName: string, viewUrl: string | null }
            & { __typename: 'Plan' }
          ) }
          & { __typename: 'Action' }
        ) | null, plan: (
          { id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Plan' }
        ) }
        & { __typename: 'Action' }
      ) }
      & { __typename: 'ActionDependencyRelationship' }
    )> }
    & { __typename: 'Action' }
  ) | null, plan: (
    { id: string, actionListPage: (
      { id: string | null, actionDateFormat: string | null, taskDateFormat: string | null, detailsMainTop: Array<(
        { field: string, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null, fields: Array<(
          { id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<(
            { choiceLabel: string | null, choiceValue: string | null }
            & { __typename: 'FormChoiceBlock' }
          )> }
          & { __typename: 'FormFieldBlock' }
        )> }
        & { __typename: 'ActionContactFormBlock' }
      ) | (
        { field: string, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null, attributeType: (
          { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )>, unit: (
            { id: string, name: string }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'ActionContentAttributeTypeBlock' }
      ) | (
        { field: string, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null, categoryType: (
          { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
            { id: string, order: number, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          )> }
          & { __typename: 'CategoryType' }
        ) }
        & { __typename: 'ActionContentCategoryTypeBlock' }
      ) | (
        { field: string, id: string | null, heading: string | null, helpText: string | null, layout: string | null, blocks: Array<(
          { field: string }
          & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactPersonsBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' }
        ) | (
          { field: string }
          & { __typename: 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' }
        ) | (
          { field: string }
          & { __typename: 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' }
        ) | (
          { field: string }
          & { __typename: 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' }
        ) | (
          { field: string }
          & { __typename: 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' }
        ) | (
          { field: string }
          & { __typename: 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' }
        ) | (
          { field: string }
          & { __typename: 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
        ) | (
          { field: string, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, fields: Array<(
            { id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<(
              { choiceLabel: string | null, choiceValue: string | null }
              & { __typename: 'FormChoiceBlock' }
            )> }
            & { __typename: 'FormFieldBlock' }
          )> }
          & { __typename: 'ActionContactFormBlock' }
        ) | (
          { field: string, attributeType: (
            { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
              { id: string, identifier: string, name: string }
              & { __typename: 'AttributeTypeChoiceOption' }
            )>, unit: (
              { id: string, name: string }
              & { __typename: 'Unit' }
            ) | null }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename: 'ActionContentAttributeTypeBlock' }
        ) | (
          { field: string, categoryType: (
            { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
              { id: string, order: number, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            )> }
            & { __typename: 'CategoryType' }
          ) }
          & { __typename: 'ActionContentCategoryTypeBlock' }
        ) | (
          { field: string, fieldLabel: string | null, caption: string | null }
          & { __typename: 'ActionOfficialNameBlock' }
        ) | (
          { field: string, fieldLabel: string | null, fieldHelpText: string | null }
          & { __typename: 'ActionRelatedActionsBlock' | 'ActionTasksBlock' | 'ChangeLogMessageBlock' }
        ) | (
          { field: string, reportField: string | null, reportType: (
            { id: string, name: string }
            & { __typename: 'ReportType' }
          ) | null, reportsToCompare: Array<(
            { identifier: string, name: string, startDate: string, endDate: string, valuesForAction: Array<(
              { attribute: (
                { id: string, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) | null, choiceOptions: Array<(
                    { id: string, identifier: string, name: string }
                    & { __typename: 'AttributeTypeChoiceOption' }
                  )> }
                  & { __typename: 'AttributeType' }
                ), categories: Array<(
                  { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                    { id: string, name: string, namePlural: string | null }
                    & { __typename: 'CategoryLevel' }
                  ) | null, image: (
                    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, rendition: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, indicators: Array<(
                    { id: string, values: Array<(
                      { id: string, date: string | null, value: number }
                      & { __typename: 'IndicatorValue' }
                    )>, goals: Array<(
                      { id: string, date: string | null, value: number }
                      & { __typename: 'IndicatorGoal' }
                    ) | null> | null, unit: (
                      { id: string, name: string, shortName: string | null }
                      & { __typename: 'Unit' }
                    ) }
                    & { __typename: 'Indicator' }
                  )>, indicatorRelationships: Array<(
                    { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                      { id: string }
                      & { __typename: 'Indicator' }
                    ) }
                    & { __typename: 'IndicatorCategoryRelationship' }
                  )>, iconImage: (
                    { id: string, rendition: (
                      { id: string, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, categoryPage: (
                    { id: string | null, title: string, urlPath: string, live: boolean }
                    & { __typename: 'CategoryPage' }
                  ) | null, type: (
                    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                    & { __typename: 'CategoryType' }
                  ), attributes: Array<(
                    { id: string, key: string }
                    & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                  ) | (
                    { value: string, id: string, key: string }
                    & { __typename: 'AttributeRichText' | 'AttributeText' }
                  )>, parent: (
                    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                          { id: string, name: string, namePlural: string | null }
                          & { __typename: 'CategoryLevel' }
                        ) | null, image: (
                          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null, rendition: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null }
                          & { __typename: 'Image' }
                        ) | null, indicators: Array<(
                          { id: string, values: Array<(
                            { id: string, date: string | null, value: number }
                            & { __typename: 'IndicatorValue' }
                          )>, goals: Array<(
                            { id: string, date: string | null, value: number }
                            & { __typename: 'IndicatorGoal' }
                          ) | null> | null, unit: (
                            { id: string, name: string, shortName: string | null }
                            & { __typename: 'Unit' }
                          ) }
                          & { __typename: 'Indicator' }
                        )>, indicatorRelationships: Array<(
                          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                            { id: string }
                            & { __typename: 'Indicator' }
                          ) }
                          & { __typename: 'IndicatorCategoryRelationship' }
                        )>, iconImage: (
                          { id: string, rendition: (
                            { id: string, src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null }
                          & { __typename: 'Image' }
                        ) | null, categoryPage: (
                          { id: string | null, title: string, urlPath: string, live: boolean }
                          & { __typename: 'CategoryPage' }
                        ) | null, type: (
                          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                          & { __typename: 'CategoryType' }
                        ), attributes: Array<(
                          { id: string, key: string }
                          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                        ) | (
                          { value: string, id: string, key: string }
                          & { __typename: 'AttributeRichText' | 'AttributeText' }
                        )> }
                        & { __typename: 'Category' }
                      ) | null, level: (
                        { id: string, name: string, namePlural: string | null }
                        & { __typename: 'CategoryLevel' }
                      ) | null, image: (
                        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, rendition: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null }
                        & { __typename: 'Image' }
                      ) | null, indicators: Array<(
                        { id: string, values: Array<(
                          { id: string, date: string | null, value: number }
                          & { __typename: 'IndicatorValue' }
                        )>, goals: Array<(
                          { id: string, date: string | null, value: number }
                          & { __typename: 'IndicatorGoal' }
                        ) | null> | null, unit: (
                          { id: string, name: string, shortName: string | null }
                          & { __typename: 'Unit' }
                        ) }
                        & { __typename: 'Indicator' }
                      )>, indicatorRelationships: Array<(
                        { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                          { id: string }
                          & { __typename: 'Indicator' }
                        ) }
                        & { __typename: 'IndicatorCategoryRelationship' }
                      )>, iconImage: (
                        { id: string, rendition: (
                          { id: string, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null }
                        & { __typename: 'Image' }
                      ) | null, categoryPage: (
                        { id: string | null, title: string, urlPath: string, live: boolean }
                        & { __typename: 'CategoryPage' }
                      ) | null, type: (
                        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                        & { __typename: 'CategoryType' }
                      ), attributes: Array<(
                        { id: string, key: string }
                        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                      ) | (
                        { value: string, id: string, key: string }
                        & { __typename: 'AttributeRichText' | 'AttributeText' }
                      )> }
                      & { __typename: 'Category' }
                    ) | null, level: (
                      { id: string, name: string, namePlural: string | null }
                      & { __typename: 'CategoryLevel' }
                    ) | null, image: (
                      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, rendition: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null }
                      & { __typename: 'Image' }
                    ) | null, indicators: Array<(
                      { id: string, values: Array<(
                        { id: string, date: string | null, value: number }
                        & { __typename: 'IndicatorValue' }
                      )>, goals: Array<(
                        { id: string, date: string | null, value: number }
                        & { __typename: 'IndicatorGoal' }
                      ) | null> | null, unit: (
                        { id: string, name: string, shortName: string | null }
                        & { __typename: 'Unit' }
                      ) }
                      & { __typename: 'Indicator' }
                    )>, indicatorRelationships: Array<(
                      { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                        { id: string }
                        & { __typename: 'Indicator' }
                      ) }
                      & { __typename: 'IndicatorCategoryRelationship' }
                    )>, iconImage: (
                      { id: string, rendition: (
                        { id: string, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null }
                      & { __typename: 'Image' }
                    ) | null, categoryPage: (
                      { id: string | null, title: string, urlPath: string, live: boolean }
                      & { __typename: 'CategoryPage' }
                    ) | null, type: (
                      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                      & { __typename: 'CategoryType' }
                    ), attributes: Array<(
                      { id: string, key: string }
                      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                    ) | (
                      { value: string, id: string, key: string }
                      & { __typename: 'AttributeRichText' | 'AttributeText' }
                    )> }
                    & { __typename: 'Category' }
                  ) | null }
                  & { __typename: 'Category' }
                )> }
                & { __typename: 'AttributeCategoryChoice' }
              ) | (
                { text: string | null, id: string, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) | null, choiceOptions: Array<(
                    { id: string, identifier: string, name: string }
                    & { __typename: 'AttributeTypeChoiceOption' }
                  )> }
                  & { __typename: 'AttributeType' }
                ), choice: (
                  { id: string, identifier: string, name: string }
                  & { __typename: 'AttributeTypeChoiceOption' }
                ) | null }
                & { __typename: 'AttributeChoice' }
              ) | (
                { id: string, numericValue: number, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) | null, choiceOptions: Array<(
                    { id: string, identifier: string, name: string }
                    & { __typename: 'AttributeTypeChoiceOption' }
                  )> }
                  & { __typename: 'AttributeType' }
                ) }
                & { __typename: 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) | null, choiceOptions: Array<(
                    { id: string, identifier: string, name: string }
                    & { __typename: 'AttributeTypeChoiceOption' }
                  )> }
                  & { __typename: 'AttributeType' }
                ) }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              ) | null, field: (
                { field: string }
                & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
              ) }
              & { __typename: 'ActionAttributeReportValue' }
            ) | (
              { field: (
                { field: string }
                & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
              ) }
              & { __typename: 'ActionCategoryReportValue' | 'ActionDateFieldReportValue' | 'ActionDateTimeFieldReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionSingleRelatedModelFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
            )> | null }
            & { __typename: 'Report' }
          ) | null> | null }
          & { __typename: 'ReportComparisonBlock' }
        ) | null> | null }
        & { __typename: 'ActionContentSectionBlock' }
      ) | (
        { field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionLeadParagraphBlock' | 'ActionPledgesBlock' | 'ActionRelatedActionsBlock' | 'ActionTasksBlock' }
      ) | (
        { field: string, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionRelatedIndicatorsBlock' }
      ) | (
        { field: string, fieldLabel: string | null, caption: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionOfficialNameBlock' }
      ) | (
        { field: string, fieldLabel: string | null, fieldHelpText: string | null }
        & { __typename: 'ChangeLogMessageBlock' }
      ) | (
        { field: string, id: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'IndicatorCausalChainBlock' }
      ) | (
        { field: string, id: string | null, heading: string | null, helpText: string | null, datasetSchema: (
          { uuid: string }
          & { __typename: 'DatasetSchema' }
        ) }
        & { __typename: 'PlanDatasetsBlock' }
      ) | (
        { field: string, reportField: string | null, reportType: (
          { id: string, name: string }
          & { __typename: 'ReportType' }
        ) | null, reportsToCompare: Array<(
          { identifier: string, name: string, startDate: string, endDate: string, valuesForAction: Array<(
            { attribute: (
              { id: string, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) | null, choiceOptions: Array<(
                  { id: string, identifier: string, name: string }
                  & { __typename: 'AttributeTypeChoiceOption' }
                )> }
                & { __typename: 'AttributeType' }
              ), categories: Array<(
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, indicatorRelationships: Array<(
                  { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                    { id: string }
                    & { __typename: 'Indicator' }
                  ) }
                  & { __typename: 'IndicatorCategoryRelationship' }
                )>, iconImage: (
                  { id: string, rendition: (
                    { id: string, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )>, parent: (
                  { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                        { id: string, name: string, namePlural: string | null }
                        & { __typename: 'CategoryLevel' }
                      ) | null, image: (
                        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, rendition: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null }
                        & { __typename: 'Image' }
                      ) | null, indicators: Array<(
                        { id: string, values: Array<(
                          { id: string, date: string | null, value: number }
                          & { __typename: 'IndicatorValue' }
                        )>, goals: Array<(
                          { id: string, date: string | null, value: number }
                          & { __typename: 'IndicatorGoal' }
                        ) | null> | null, unit: (
                          { id: string, name: string, shortName: string | null }
                          & { __typename: 'Unit' }
                        ) }
                        & { __typename: 'Indicator' }
                      )>, indicatorRelationships: Array<(
                        { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                          { id: string }
                          & { __typename: 'Indicator' }
                        ) }
                        & { __typename: 'IndicatorCategoryRelationship' }
                      )>, iconImage: (
                        { id: string, rendition: (
                          { id: string, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null }
                        & { __typename: 'Image' }
                      ) | null, categoryPage: (
                        { id: string | null, title: string, urlPath: string, live: boolean }
                        & { __typename: 'CategoryPage' }
                      ) | null, type: (
                        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                        & { __typename: 'CategoryType' }
                      ), attributes: Array<(
                        { id: string, key: string }
                        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                      ) | (
                        { value: string, id: string, key: string }
                        & { __typename: 'AttributeRichText' | 'AttributeText' }
                      )> }
                      & { __typename: 'Category' }
                    ) | null, level: (
                      { id: string, name: string, namePlural: string | null }
                      & { __typename: 'CategoryLevel' }
                    ) | null, image: (
                      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, rendition: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null }
                      & { __typename: 'Image' }
                    ) | null, indicators: Array<(
                      { id: string, values: Array<(
                        { id: string, date: string | null, value: number }
                        & { __typename: 'IndicatorValue' }
                      )>, goals: Array<(
                        { id: string, date: string | null, value: number }
                        & { __typename: 'IndicatorGoal' }
                      ) | null> | null, unit: (
                        { id: string, name: string, shortName: string | null }
                        & { __typename: 'Unit' }
                      ) }
                      & { __typename: 'Indicator' }
                    )>, indicatorRelationships: Array<(
                      { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                        { id: string }
                        & { __typename: 'Indicator' }
                      ) }
                      & { __typename: 'IndicatorCategoryRelationship' }
                    )>, iconImage: (
                      { id: string, rendition: (
                        { id: string, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null }
                      & { __typename: 'Image' }
                    ) | null, categoryPage: (
                      { id: string | null, title: string, urlPath: string, live: boolean }
                      & { __typename: 'CategoryPage' }
                    ) | null, type: (
                      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                      & { __typename: 'CategoryType' }
                    ), attributes: Array<(
                      { id: string, key: string }
                      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                    ) | (
                      { value: string, id: string, key: string }
                      & { __typename: 'AttributeRichText' | 'AttributeText' }
                    )> }
                    & { __typename: 'Category' }
                  ) | null, level: (
                    { id: string, name: string, namePlural: string | null }
                    & { __typename: 'CategoryLevel' }
                  ) | null, image: (
                    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, rendition: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, indicators: Array<(
                    { id: string, values: Array<(
                      { id: string, date: string | null, value: number }
                      & { __typename: 'IndicatorValue' }
                    )>, goals: Array<(
                      { id: string, date: string | null, value: number }
                      & { __typename: 'IndicatorGoal' }
                    ) | null> | null, unit: (
                      { id: string, name: string, shortName: string | null }
                      & { __typename: 'Unit' }
                    ) }
                    & { __typename: 'Indicator' }
                  )>, indicatorRelationships: Array<(
                    { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                      { id: string }
                      & { __typename: 'Indicator' }
                    ) }
                    & { __typename: 'IndicatorCategoryRelationship' }
                  )>, iconImage: (
                    { id: string, rendition: (
                      { id: string, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, categoryPage: (
                    { id: string | null, title: string, urlPath: string, live: boolean }
                    & { __typename: 'CategoryPage' }
                  ) | null, type: (
                    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                    & { __typename: 'CategoryType' }
                  ), attributes: Array<(
                    { id: string, key: string }
                    & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                  ) | (
                    { value: string, id: string, key: string }
                    & { __typename: 'AttributeRichText' | 'AttributeText' }
                  )> }
                  & { __typename: 'Category' }
                ) | null }
                & { __typename: 'Category' }
              )> }
              & { __typename: 'AttributeCategoryChoice' }
            ) | (
              { text: string | null, id: string, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) | null, choiceOptions: Array<(
                  { id: string, identifier: string, name: string }
                  & { __typename: 'AttributeTypeChoiceOption' }
                )> }
                & { __typename: 'AttributeType' }
              ), choice: (
                { id: string, identifier: string, name: string }
                & { __typename: 'AttributeTypeChoiceOption' }
              ) | null }
              & { __typename: 'AttributeChoice' }
            ) | (
              { id: string, numericValue: number, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) | null, choiceOptions: Array<(
                  { id: string, identifier: string, name: string }
                  & { __typename: 'AttributeTypeChoiceOption' }
                )> }
                & { __typename: 'AttributeType' }
              ) }
              & { __typename: 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) | null, choiceOptions: Array<(
                  { id: string, identifier: string, name: string }
                  & { __typename: 'AttributeTypeChoiceOption' }
                )> }
                & { __typename: 'AttributeType' }
              ) }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            ) | null, field: (
              { field: string }
              & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
            ) }
            & { __typename: 'ActionAttributeReportValue' }
          ) | (
            { field: (
              { field: string }
              & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
            ) }
            & { __typename: 'ActionCategoryReportValue' | 'ActionDateFieldReportValue' | 'ActionDateTimeFieldReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionSingleRelatedModelFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
          )> | null }
          & { __typename: 'Report' }
        ) | null> | null }
        & { __typename: 'ReportComparisonBlock' }
      )> | null, detailsMainBottom: Array<(
        { field: string, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null, fields: Array<(
          { id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<(
            { choiceLabel: string | null, choiceValue: string | null }
            & { __typename: 'FormChoiceBlock' }
          )> }
          & { __typename: 'FormFieldBlock' }
        )> }
        & { __typename: 'ActionContactFormBlock' }
      ) | (
        { field: string, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null, attributeType: (
          { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )>, unit: (
            { id: string, name: string }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'ActionContentAttributeTypeBlock' }
      ) | (
        { field: string, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null, categoryType: (
          { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
            { id: string, order: number, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          )> }
          & { __typename: 'CategoryType' }
        ) }
        & { __typename: 'ActionContentCategoryTypeBlock' }
      ) | (
        { field: string, id: string | null, heading: string | null, helpText: string | null, layout: string | null, blocks: Array<(
          { field: string }
          & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactPersonsBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' }
        ) | (
          { field: string }
          & { __typename: 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' }
        ) | (
          { field: string }
          & { __typename: 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' }
        ) | (
          { field: string }
          & { __typename: 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' }
        ) | (
          { field: string }
          & { __typename: 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' }
        ) | (
          { field: string }
          & { __typename: 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' }
        ) | (
          { field: string }
          & { __typename: 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
        ) | (
          { field: string, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, fields: Array<(
            { id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<(
              { choiceLabel: string | null, choiceValue: string | null }
              & { __typename: 'FormChoiceBlock' }
            )> }
            & { __typename: 'FormFieldBlock' }
          )> }
          & { __typename: 'ActionContactFormBlock' }
        ) | (
          { field: string, attributeType: (
            { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
              { id: string, identifier: string, name: string }
              & { __typename: 'AttributeTypeChoiceOption' }
            )>, unit: (
              { id: string, name: string }
              & { __typename: 'Unit' }
            ) | null }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename: 'ActionContentAttributeTypeBlock' }
        ) | (
          { field: string, categoryType: (
            { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
              { id: string, order: number, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            )> }
            & { __typename: 'CategoryType' }
          ) }
          & { __typename: 'ActionContentCategoryTypeBlock' }
        ) | (
          { field: string, fieldLabel: string | null, caption: string | null }
          & { __typename: 'ActionOfficialNameBlock' }
        ) | (
          { field: string, fieldLabel: string | null, fieldHelpText: string | null }
          & { __typename: 'ActionRelatedActionsBlock' | 'ActionTasksBlock' | 'ChangeLogMessageBlock' }
        ) | (
          { field: string, reportField: string | null, reportType: (
            { id: string, name: string }
            & { __typename: 'ReportType' }
          ) | null, reportsToCompare: Array<(
            { identifier: string, name: string, startDate: string, endDate: string, valuesForAction: Array<(
              { attribute: (
                { id: string, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) | null, choiceOptions: Array<(
                    { id: string, identifier: string, name: string }
                    & { __typename: 'AttributeTypeChoiceOption' }
                  )> }
                  & { __typename: 'AttributeType' }
                ), categories: Array<(
                  { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                    { id: string, name: string, namePlural: string | null }
                    & { __typename: 'CategoryLevel' }
                  ) | null, image: (
                    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, rendition: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, indicators: Array<(
                    { id: string, values: Array<(
                      { id: string, date: string | null, value: number }
                      & { __typename: 'IndicatorValue' }
                    )>, goals: Array<(
                      { id: string, date: string | null, value: number }
                      & { __typename: 'IndicatorGoal' }
                    ) | null> | null, unit: (
                      { id: string, name: string, shortName: string | null }
                      & { __typename: 'Unit' }
                    ) }
                    & { __typename: 'Indicator' }
                  )>, indicatorRelationships: Array<(
                    { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                      { id: string }
                      & { __typename: 'Indicator' }
                    ) }
                    & { __typename: 'IndicatorCategoryRelationship' }
                  )>, iconImage: (
                    { id: string, rendition: (
                      { id: string, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, categoryPage: (
                    { id: string | null, title: string, urlPath: string, live: boolean }
                    & { __typename: 'CategoryPage' }
                  ) | null, type: (
                    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                    & { __typename: 'CategoryType' }
                  ), attributes: Array<(
                    { id: string, key: string }
                    & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                  ) | (
                    { value: string, id: string, key: string }
                    & { __typename: 'AttributeRichText' | 'AttributeText' }
                  )>, parent: (
                    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                          { id: string, name: string, namePlural: string | null }
                          & { __typename: 'CategoryLevel' }
                        ) | null, image: (
                          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null, rendition: (
                            { id: string, width: number, height: number, src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null }
                          & { __typename: 'Image' }
                        ) | null, indicators: Array<(
                          { id: string, values: Array<(
                            { id: string, date: string | null, value: number }
                            & { __typename: 'IndicatorValue' }
                          )>, goals: Array<(
                            { id: string, date: string | null, value: number }
                            & { __typename: 'IndicatorGoal' }
                          ) | null> | null, unit: (
                            { id: string, name: string, shortName: string | null }
                            & { __typename: 'Unit' }
                          ) }
                          & { __typename: 'Indicator' }
                        )>, indicatorRelationships: Array<(
                          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                            { id: string }
                            & { __typename: 'Indicator' }
                          ) }
                          & { __typename: 'IndicatorCategoryRelationship' }
                        )>, iconImage: (
                          { id: string, rendition: (
                            { id: string, src: string }
                            & { __typename: 'ImageRendition' }
                          ) | null }
                          & { __typename: 'Image' }
                        ) | null, categoryPage: (
                          { id: string | null, title: string, urlPath: string, live: boolean }
                          & { __typename: 'CategoryPage' }
                        ) | null, type: (
                          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                          & { __typename: 'CategoryType' }
                        ), attributes: Array<(
                          { id: string, key: string }
                          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                        ) | (
                          { value: string, id: string, key: string }
                          & { __typename: 'AttributeRichText' | 'AttributeText' }
                        )> }
                        & { __typename: 'Category' }
                      ) | null, level: (
                        { id: string, name: string, namePlural: string | null }
                        & { __typename: 'CategoryLevel' }
                      ) | null, image: (
                        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, rendition: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null }
                        & { __typename: 'Image' }
                      ) | null, indicators: Array<(
                        { id: string, values: Array<(
                          { id: string, date: string | null, value: number }
                          & { __typename: 'IndicatorValue' }
                        )>, goals: Array<(
                          { id: string, date: string | null, value: number }
                          & { __typename: 'IndicatorGoal' }
                        ) | null> | null, unit: (
                          { id: string, name: string, shortName: string | null }
                          & { __typename: 'Unit' }
                        ) }
                        & { __typename: 'Indicator' }
                      )>, indicatorRelationships: Array<(
                        { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                          { id: string }
                          & { __typename: 'Indicator' }
                        ) }
                        & { __typename: 'IndicatorCategoryRelationship' }
                      )>, iconImage: (
                        { id: string, rendition: (
                          { id: string, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null }
                        & { __typename: 'Image' }
                      ) | null, categoryPage: (
                        { id: string | null, title: string, urlPath: string, live: boolean }
                        & { __typename: 'CategoryPage' }
                      ) | null, type: (
                        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                        & { __typename: 'CategoryType' }
                      ), attributes: Array<(
                        { id: string, key: string }
                        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                      ) | (
                        { value: string, id: string, key: string }
                        & { __typename: 'AttributeRichText' | 'AttributeText' }
                      )> }
                      & { __typename: 'Category' }
                    ) | null, level: (
                      { id: string, name: string, namePlural: string | null }
                      & { __typename: 'CategoryLevel' }
                    ) | null, image: (
                      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, rendition: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null }
                      & { __typename: 'Image' }
                    ) | null, indicators: Array<(
                      { id: string, values: Array<(
                        { id: string, date: string | null, value: number }
                        & { __typename: 'IndicatorValue' }
                      )>, goals: Array<(
                        { id: string, date: string | null, value: number }
                        & { __typename: 'IndicatorGoal' }
                      ) | null> | null, unit: (
                        { id: string, name: string, shortName: string | null }
                        & { __typename: 'Unit' }
                      ) }
                      & { __typename: 'Indicator' }
                    )>, indicatorRelationships: Array<(
                      { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                        { id: string }
                        & { __typename: 'Indicator' }
                      ) }
                      & { __typename: 'IndicatorCategoryRelationship' }
                    )>, iconImage: (
                      { id: string, rendition: (
                        { id: string, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null }
                      & { __typename: 'Image' }
                    ) | null, categoryPage: (
                      { id: string | null, title: string, urlPath: string, live: boolean }
                      & { __typename: 'CategoryPage' }
                    ) | null, type: (
                      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                      & { __typename: 'CategoryType' }
                    ), attributes: Array<(
                      { id: string, key: string }
                      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                    ) | (
                      { value: string, id: string, key: string }
                      & { __typename: 'AttributeRichText' | 'AttributeText' }
                    )> }
                    & { __typename: 'Category' }
                  ) | null }
                  & { __typename: 'Category' }
                )> }
                & { __typename: 'AttributeCategoryChoice' }
              ) | (
                { text: string | null, id: string, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) | null, choiceOptions: Array<(
                    { id: string, identifier: string, name: string }
                    & { __typename: 'AttributeTypeChoiceOption' }
                  )> }
                  & { __typename: 'AttributeType' }
                ), choice: (
                  { id: string, identifier: string, name: string }
                  & { __typename: 'AttributeTypeChoiceOption' }
                ) | null }
                & { __typename: 'AttributeChoice' }
              ) | (
                { id: string, numericValue: number, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) | null, choiceOptions: Array<(
                    { id: string, identifier: string, name: string }
                    & { __typename: 'AttributeTypeChoiceOption' }
                  )> }
                  & { __typename: 'AttributeType' }
                ) }
                & { __typename: 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, type: (
                  { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) | null, choiceOptions: Array<(
                    { id: string, identifier: string, name: string }
                    & { __typename: 'AttributeTypeChoiceOption' }
                  )> }
                  & { __typename: 'AttributeType' }
                ) }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              ) | null, field: (
                { field: string }
                & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
              ) }
              & { __typename: 'ActionAttributeReportValue' }
            ) | (
              { field: (
                { field: string }
                & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
              ) }
              & { __typename: 'ActionCategoryReportValue' | 'ActionDateFieldReportValue' | 'ActionDateTimeFieldReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionSingleRelatedModelFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
            )> | null }
            & { __typename: 'Report' }
          ) | null> | null }
          & { __typename: 'ReportComparisonBlock' }
        ) | null> | null }
        & { __typename: 'ActionContentSectionBlock' }
      ) | (
        { field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionLeadParagraphBlock' | 'ActionPledgesBlock' | 'ActionRelatedActionsBlock' | 'ActionTasksBlock' }
      ) | (
        { field: string, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionRelatedIndicatorsBlock' }
      ) | (
        { field: string, fieldLabel: string | null, caption: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionOfficialNameBlock' }
      ) | (
        { field: string, fieldLabel: string | null, fieldHelpText: string | null }
        & { __typename: 'ChangeLogMessageBlock' }
      ) | (
        { field: string, id: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'IndicatorCausalChainBlock' }
      ) | (
        { field: string, id: string | null, heading: string | null, helpText: string | null, datasetSchema: (
          { uuid: string }
          & { __typename: 'DatasetSchema' }
        ) }
        & { __typename: 'PlanDatasetsBlock' }
      ) | (
        { field: string, reportField: string | null, reportType: (
          { id: string, name: string }
          & { __typename: 'ReportType' }
        ) | null, reportsToCompare: Array<(
          { identifier: string, name: string, startDate: string, endDate: string, valuesForAction: Array<(
            { attribute: (
              { id: string, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) | null, choiceOptions: Array<(
                  { id: string, identifier: string, name: string }
                  & { __typename: 'AttributeTypeChoiceOption' }
                )> }
                & { __typename: 'AttributeType' }
              ), categories: Array<(
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, indicatorRelationships: Array<(
                  { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                    { id: string }
                    & { __typename: 'Indicator' }
                  ) }
                  & { __typename: 'IndicatorCategoryRelationship' }
                )>, iconImage: (
                  { id: string, rendition: (
                    { id: string, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )>, parent: (
                  { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                        { id: string, name: string, namePlural: string | null }
                        & { __typename: 'CategoryLevel' }
                      ) | null, image: (
                        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null, rendition: (
                          { id: string, width: number, height: number, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null }
                        & { __typename: 'Image' }
                      ) | null, indicators: Array<(
                        { id: string, values: Array<(
                          { id: string, date: string | null, value: number }
                          & { __typename: 'IndicatorValue' }
                        )>, goals: Array<(
                          { id: string, date: string | null, value: number }
                          & { __typename: 'IndicatorGoal' }
                        ) | null> | null, unit: (
                          { id: string, name: string, shortName: string | null }
                          & { __typename: 'Unit' }
                        ) }
                        & { __typename: 'Indicator' }
                      )>, indicatorRelationships: Array<(
                        { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                          { id: string }
                          & { __typename: 'Indicator' }
                        ) }
                        & { __typename: 'IndicatorCategoryRelationship' }
                      )>, iconImage: (
                        { id: string, rendition: (
                          { id: string, src: string }
                          & { __typename: 'ImageRendition' }
                        ) | null }
                        & { __typename: 'Image' }
                      ) | null, categoryPage: (
                        { id: string | null, title: string, urlPath: string, live: boolean }
                        & { __typename: 'CategoryPage' }
                      ) | null, type: (
                        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                        & { __typename: 'CategoryType' }
                      ), attributes: Array<(
                        { id: string, key: string }
                        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                      ) | (
                        { value: string, id: string, key: string }
                        & { __typename: 'AttributeRichText' | 'AttributeText' }
                      )> }
                      & { __typename: 'Category' }
                    ) | null, level: (
                      { id: string, name: string, namePlural: string | null }
                      & { __typename: 'CategoryLevel' }
                    ) | null, image: (
                      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null, rendition: (
                        { id: string, width: number, height: number, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null }
                      & { __typename: 'Image' }
                    ) | null, indicators: Array<(
                      { id: string, values: Array<(
                        { id: string, date: string | null, value: number }
                        & { __typename: 'IndicatorValue' }
                      )>, goals: Array<(
                        { id: string, date: string | null, value: number }
                        & { __typename: 'IndicatorGoal' }
                      ) | null> | null, unit: (
                        { id: string, name: string, shortName: string | null }
                        & { __typename: 'Unit' }
                      ) }
                      & { __typename: 'Indicator' }
                    )>, indicatorRelationships: Array<(
                      { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                        { id: string }
                        & { __typename: 'Indicator' }
                      ) }
                      & { __typename: 'IndicatorCategoryRelationship' }
                    )>, iconImage: (
                      { id: string, rendition: (
                        { id: string, src: string }
                        & { __typename: 'ImageRendition' }
                      ) | null }
                      & { __typename: 'Image' }
                    ) | null, categoryPage: (
                      { id: string | null, title: string, urlPath: string, live: boolean }
                      & { __typename: 'CategoryPage' }
                    ) | null, type: (
                      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                      & { __typename: 'CategoryType' }
                    ), attributes: Array<(
                      { id: string, key: string }
                      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                    ) | (
                      { value: string, id: string, key: string }
                      & { __typename: 'AttributeRichText' | 'AttributeText' }
                    )> }
                    & { __typename: 'Category' }
                  ) | null, level: (
                    { id: string, name: string, namePlural: string | null }
                    & { __typename: 'CategoryLevel' }
                  ) | null, image: (
                    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, rendition: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, indicators: Array<(
                    { id: string, values: Array<(
                      { id: string, date: string | null, value: number }
                      & { __typename: 'IndicatorValue' }
                    )>, goals: Array<(
                      { id: string, date: string | null, value: number }
                      & { __typename: 'IndicatorGoal' }
                    ) | null> | null, unit: (
                      { id: string, name: string, shortName: string | null }
                      & { __typename: 'Unit' }
                    ) }
                    & { __typename: 'Indicator' }
                  )>, indicatorRelationships: Array<(
                    { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                      { id: string }
                      & { __typename: 'Indicator' }
                    ) }
                    & { __typename: 'IndicatorCategoryRelationship' }
                  )>, iconImage: (
                    { id: string, rendition: (
                      { id: string, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, categoryPage: (
                    { id: string | null, title: string, urlPath: string, live: boolean }
                    & { __typename: 'CategoryPage' }
                  ) | null, type: (
                    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                    & { __typename: 'CategoryType' }
                  ), attributes: Array<(
                    { id: string, key: string }
                    & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                  ) | (
                    { value: string, id: string, key: string }
                    & { __typename: 'AttributeRichText' | 'AttributeText' }
                  )> }
                  & { __typename: 'Category' }
                ) | null }
                & { __typename: 'Category' }
              )> }
              & { __typename: 'AttributeCategoryChoice' }
            ) | (
              { text: string | null, id: string, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) | null, choiceOptions: Array<(
                  { id: string, identifier: string, name: string }
                  & { __typename: 'AttributeTypeChoiceOption' }
                )> }
                & { __typename: 'AttributeType' }
              ), choice: (
                { id: string, identifier: string, name: string }
                & { __typename: 'AttributeTypeChoiceOption' }
              ) | null }
              & { __typename: 'AttributeChoice' }
            ) | (
              { id: string, numericValue: number, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) | null, choiceOptions: Array<(
                  { id: string, identifier: string, name: string }
                  & { __typename: 'AttributeTypeChoiceOption' }
                )> }
                & { __typename: 'AttributeType' }
              ) }
              & { __typename: 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, type: (
                { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) | null, choiceOptions: Array<(
                  { id: string, identifier: string, name: string }
                  & { __typename: 'AttributeTypeChoiceOption' }
                )> }
                & { __typename: 'AttributeType' }
              ) }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            ) | null, field: (
              { field: string }
              & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
            ) }
            & { __typename: 'ActionAttributeReportValue' }
          ) | (
            { field: (
              { field: string }
              & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
            ) }
            & { __typename: 'ActionCategoryReportValue' | 'ActionDateFieldReportValue' | 'ActionDateTimeFieldReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionSingleRelatedModelFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
          )> | null }
          & { __typename: 'Report' }
        ) | null> | null }
        & { __typename: 'ReportComparisonBlock' }
      )> | null, detailsAside: Array<(
        { fieldLabel: string | null, fieldHelpText: string | null, field: string, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionContactPersonsBlock' | 'ActionScheduleBlock' }
      ) | (
        { fieldLabel: string | null, fieldHelpText: string | null, field: string, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null, attributeType: (
          { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )>, unit: (
            { id: string, name: string }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'ActionContentAttributeTypeBlock' }
      ) | (
        { fieldLabel: string | null, fieldHelpText: string | null, field: string, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null, categoryType: (
          { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
            { id: string, order: number, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          )> }
          & { __typename: 'CategoryType' }
        ) }
        & { __typename: 'ActionContentCategoryTypeBlock' }
      ) | (
        { fieldLabel: string | null, fieldHelpText: string | null, field: string, heading: string | null, meta: (
          { restricted: boolean | null, hidden: boolean | null }
          & { __typename: 'FieldBlockMetaData' }
        ) | null }
        & { __typename: 'ActionResponsiblePartiesBlock' }
      ) | (
        { field: string, fieldLabel: string | null, fieldHelpText: string | null }
        & { __typename: 'ChangeLogMessageBlock' }
      )> | null }
      & { __typename: 'ActionListPage' }
    ) | null, actionAttributeTypes: Array<(
      { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
        { id: string, identifier: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      )>, unit: (
        { id: string, name: string }
        & { __typename: 'Unit' }
      ) | null }
      & { __typename: 'AttributeType' }
    )>, generalContent: (
      { id: string, actionTerm: SiteGeneralContentActionTerm }
      & { __typename: 'SiteGeneralContent' }
    ) }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type ActionDependenciesFragment = (
  { id: string, dependencyRole: (
    { id: string, name: string }
    & { __typename: 'ActionDependencyRole' }
  ) | null, allDependencyRelationships: Array<(
    { id: string, preceding: (
      { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, dependencyRole: (
        { id: string, name: string }
        & { __typename: 'ActionDependencyRole' }
      ) | null, status: (
        { id: string, identifier: string, name: string, color: string }
        & { __typename: 'ActionStatus' }
      ) | null, categories: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )>, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      )>, statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename: 'ActionStatusSummary' }
      ), implementationPhase: (
        { id: string, identifier: string, name: string }
        & { __typename: 'ActionImplementationPhase' }
      ) | null, primaryOrg: (
        { id: string, abbreviation: string | null, name: string, logo: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Organization' }
      ) | null, mergedWith: (
        { id: string, identifier: string, viewUrl: string, plan: (
          { id: string, shortName: string | null, name: string, versionName: string, viewUrl: string | null }
          & { __typename: 'Plan' }
        ) }
        & { __typename: 'Action' }
      ) | null, plan: (
        { id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ), dependent: (
      { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, dependencyRole: (
        { id: string, name: string }
        & { __typename: 'ActionDependencyRole' }
      ) | null, status: (
        { id: string, identifier: string, name: string, color: string }
        & { __typename: 'ActionStatus' }
      ) | null, categories: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )>, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      )>, statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename: 'ActionStatusSummary' }
      ), implementationPhase: (
        { id: string, identifier: string, name: string }
        & { __typename: 'ActionImplementationPhase' }
      ) | null, primaryOrg: (
        { id: string, abbreviation: string | null, name: string, logo: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Organization' }
      ) | null, mergedWith: (
        { id: string, identifier: string, viewUrl: string, plan: (
          { id: string, shortName: string | null, name: string, versionName: string, viewUrl: string | null }
          & { __typename: 'Plan' }
        ) }
        & { __typename: 'Action' }
      ) | null, plan: (
        { id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ) }
    & { __typename: 'ActionDependencyRelationship' }
  )> }
  & { __typename: 'Action' }
);

type ActionAsideContentBlocks_ActionContactPersonsBlock_ActionScheduleBlock_Fragment = (
  { fieldLabel: string | null, fieldHelpText: string | null, field: string, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionContactPersonsBlock' | 'ActionScheduleBlock' }
);

type ActionAsideContentBlocks_ActionContentAttributeTypeBlock_Fragment = (
  { fieldLabel: string | null, fieldHelpText: string | null, field: string, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null, attributeType: (
    { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
      { id: string, identifier: string, name: string }
      & { __typename: 'AttributeTypeChoiceOption' }
    )>, unit: (
      { id: string, name: string }
      & { __typename: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'ActionContentAttributeTypeBlock' }
);

type ActionAsideContentBlocks_ActionContentCategoryTypeBlock_Fragment = (
  { fieldLabel: string | null, fieldHelpText: string | null, field: string, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null, categoryType: (
    { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
      { id: string, order: number, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    )> }
    & { __typename: 'CategoryType' }
  ) }
  & { __typename: 'ActionContentCategoryTypeBlock' }
);

type ActionAsideContentBlocks_ActionResponsiblePartiesBlock_Fragment = (
  { fieldLabel: string | null, fieldHelpText: string | null, field: string, heading: string | null, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionResponsiblePartiesBlock' }
);

type ActionAsideContentBlocks_ChangeLogMessageBlock_Fragment = (
  { field: string, fieldLabel: string | null, fieldHelpText: string | null }
  & { __typename: 'ChangeLogMessageBlock' }
);

export type ActionAsideContentBlocksFragment = ActionAsideContentBlocks_ActionContactPersonsBlock_ActionScheduleBlock_Fragment | ActionAsideContentBlocks_ActionContentAttributeTypeBlock_Fragment | ActionAsideContentBlocks_ActionContentCategoryTypeBlock_Fragment | ActionAsideContentBlocks_ActionResponsiblePartiesBlock_Fragment | ActionAsideContentBlocks_ChangeLogMessageBlock_Fragment;

type ActionMainContentBlocks_ActionContactFormBlock_Fragment = (
  { field: string, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null, fields: Array<(
    { id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<(
      { choiceLabel: string | null, choiceValue: string | null }
      & { __typename: 'FormChoiceBlock' }
    )> }
    & { __typename: 'FormFieldBlock' }
  )> }
  & { __typename: 'ActionContactFormBlock' }
);

type ActionMainContentBlocks_ActionContentAttributeTypeBlock_Fragment = (
  { field: string, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null, attributeType: (
    { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
      { id: string, identifier: string, name: string }
      & { __typename: 'AttributeTypeChoiceOption' }
    )>, unit: (
      { id: string, name: string }
      & { __typename: 'Unit' }
    ) | null }
    & { __typename: 'AttributeType' }
  ) }
  & { __typename: 'ActionContentAttributeTypeBlock' }
);

type ActionMainContentBlocks_ActionContentCategoryTypeBlock_Fragment = (
  { field: string, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null, categoryType: (
    { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
      { id: string, order: number, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    )> }
    & { __typename: 'CategoryType' }
  ) }
  & { __typename: 'ActionContentCategoryTypeBlock' }
);

type ActionMainContentBlocks_ActionContentSectionBlock_Fragment = (
  { field: string, id: string | null, heading: string | null, helpText: string | null, layout: string | null, blocks: Array<(
    { field: string }
    & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactPersonsBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' }
  ) | (
    { field: string }
    & { __typename: 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' }
  ) | (
    { field: string }
    & { __typename: 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'CharBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' | 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' }
  ) | (
    { field: string }
    & { __typename: 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' }
  ) | (
    { field: string }
    & { __typename: 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' }
  ) | (
    { field: string }
    & { __typename: 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' }
  ) | (
    { field: string }
    & { __typename: 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
  ) | (
    { field: string, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, fields: Array<(
      { id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<(
        { choiceLabel: string | null, choiceValue: string | null }
        & { __typename: 'FormChoiceBlock' }
      )> }
      & { __typename: 'FormFieldBlock' }
    )> }
    & { __typename: 'ActionContactFormBlock' }
  ) | (
    { field: string, attributeType: (
      { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
        { id: string, identifier: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      )>, unit: (
        { id: string, name: string }
        & { __typename: 'Unit' }
      ) | null }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'ActionContentAttributeTypeBlock' }
  ) | (
    { field: string, categoryType: (
      { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
        { id: string, order: number, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      )> }
      & { __typename: 'CategoryType' }
    ) }
    & { __typename: 'ActionContentCategoryTypeBlock' }
  ) | (
    { field: string, fieldLabel: string | null, caption: string | null }
    & { __typename: 'ActionOfficialNameBlock' }
  ) | (
    { field: string, fieldLabel: string | null, fieldHelpText: string | null }
    & { __typename: 'ActionRelatedActionsBlock' | 'ActionTasksBlock' | 'ChangeLogMessageBlock' }
  ) | (
    { field: string, reportField: string | null, reportType: (
      { id: string, name: string }
      & { __typename: 'ReportType' }
    ) | null, reportsToCompare: Array<(
      { identifier: string, name: string, startDate: string, endDate: string, valuesForAction: Array<(
        { attribute: (
          { id: string, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) | null, choiceOptions: Array<(
              { id: string, identifier: string, name: string }
              & { __typename: 'AttributeTypeChoiceOption' }
            )> }
            & { __typename: 'AttributeType' }
          ), categories: Array<(
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )>, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                  { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                    { id: string, name: string, namePlural: string | null }
                    & { __typename: 'CategoryLevel' }
                  ) | null, image: (
                    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, rendition: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, indicators: Array<(
                    { id: string, values: Array<(
                      { id: string, date: string | null, value: number }
                      & { __typename: 'IndicatorValue' }
                    )>, goals: Array<(
                      { id: string, date: string | null, value: number }
                      & { __typename: 'IndicatorGoal' }
                    ) | null> | null, unit: (
                      { id: string, name: string, shortName: string | null }
                      & { __typename: 'Unit' }
                    ) }
                    & { __typename: 'Indicator' }
                  )>, indicatorRelationships: Array<(
                    { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                      { id: string }
                      & { __typename: 'Indicator' }
                    ) }
                    & { __typename: 'IndicatorCategoryRelationship' }
                  )>, iconImage: (
                    { id: string, rendition: (
                      { id: string, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, categoryPage: (
                    { id: string | null, title: string, urlPath: string, live: boolean }
                    & { __typename: 'CategoryPage' }
                  ) | null, type: (
                    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                    & { __typename: 'CategoryType' }
                  ), attributes: Array<(
                    { id: string, key: string }
                    & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                  ) | (
                    { value: string, id: string, key: string }
                    & { __typename: 'AttributeRichText' | 'AttributeText' }
                  )> }
                  & { __typename: 'Category' }
                ) | null, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, indicatorRelationships: Array<(
                  { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                    { id: string }
                    & { __typename: 'Indicator' }
                  ) }
                  & { __typename: 'IndicatorCategoryRelationship' }
                )>, iconImage: (
                  { id: string, rendition: (
                    { id: string, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null }
            & { __typename: 'Category' }
          )> }
          & { __typename: 'AttributeCategoryChoice' }
        ) | (
          { text: string | null, id: string, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) | null, choiceOptions: Array<(
              { id: string, identifier: string, name: string }
              & { __typename: 'AttributeTypeChoiceOption' }
            )> }
            & { __typename: 'AttributeType' }
          ), choice: (
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          ) | null }
          & { __typename: 'AttributeChoice' }
        ) | (
          { id: string, numericValue: number, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) | null, choiceOptions: Array<(
              { id: string, identifier: string, name: string }
              & { __typename: 'AttributeTypeChoiceOption' }
            )> }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename: 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) | null, choiceOptions: Array<(
              { id: string, identifier: string, name: string }
              & { __typename: 'AttributeTypeChoiceOption' }
            )> }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        ) | null, field: (
          { field: string }
          & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
        ) }
        & { __typename: 'ActionAttributeReportValue' }
      ) | (
        { field: (
          { field: string }
          & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
        ) }
        & { __typename: 'ActionCategoryReportValue' | 'ActionDateFieldReportValue' | 'ActionDateTimeFieldReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionSingleRelatedModelFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
      )> | null }
      & { __typename: 'Report' }
    ) | null> | null }
    & { __typename: 'ReportComparisonBlock' }
  ) | null> | null }
  & { __typename: 'ActionContentSectionBlock' }
);

type ActionMainContentBlocks_Pm7qvkEswOj3HalNkYhsetHyZj7fjuxRq5zDrUiKNw_Fragment = (
  { field: string, fieldLabel: string | null, fieldHelpText: string | null, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionLeadParagraphBlock' | 'ActionPledgesBlock' | 'ActionRelatedActionsBlock' | 'ActionTasksBlock' }
);

type ActionMainContentBlocks_ActionLinksBlock_ActionMergedActionsBlock_ActionRelatedIndicatorsBlock_Fragment = (
  { field: string, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionLinksBlock' | 'ActionMergedActionsBlock' | 'ActionRelatedIndicatorsBlock' }
);

type ActionMainContentBlocks_ActionOfficialNameBlock_Fragment = (
  { field: string, fieldLabel: string | null, caption: string | null, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'ActionOfficialNameBlock' }
);

type ActionMainContentBlocks_ChangeLogMessageBlock_Fragment = (
  { field: string, fieldLabel: string | null, fieldHelpText: string | null }
  & { __typename: 'ChangeLogMessageBlock' }
);

type ActionMainContentBlocks_IndicatorCausalChainBlock_Fragment = (
  { field: string, id: string | null, meta: (
    { restricted: boolean | null, hidden: boolean | null }
    & { __typename: 'FieldBlockMetaData' }
  ) | null }
  & { __typename: 'IndicatorCausalChainBlock' }
);

type ActionMainContentBlocks_PlanDatasetsBlock_Fragment = (
  { field: string, id: string | null, heading: string | null, helpText: string | null, datasetSchema: (
    { uuid: string }
    & { __typename: 'DatasetSchema' }
  ) }
  & { __typename: 'PlanDatasetsBlock' }
);

type ActionMainContentBlocks_ReportComparisonBlock_Fragment = (
  { field: string, reportField: string | null, reportType: (
    { id: string, name: string }
    & { __typename: 'ReportType' }
  ) | null, reportsToCompare: Array<(
    { identifier: string, name: string, startDate: string, endDate: string, valuesForAction: Array<(
      { attribute: (
        { id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, indicatorRelationships: Array<(
                  { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                    { id: string }
                    & { __typename: 'Indicator' }
                  ) }
                  & { __typename: 'IndicatorCategoryRelationship' }
                )>, iconImage: (
                  { id: string, rendition: (
                    { id: string, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'AttributeCategoryChoice' }
      ) | (
        { text: string | null, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), choice: (
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        ) | null }
        & { __typename: 'AttributeChoice' }
      ) | (
        { id: string, numericValue: number, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      ) | null, field: (
        { field: string }
        & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
      ) }
      & { __typename: 'ActionAttributeReportValue' }
    ) | (
      { field: (
        { field: string }
        & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
      ) }
      & { __typename: 'ActionCategoryReportValue' | 'ActionDateFieldReportValue' | 'ActionDateTimeFieldReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionSingleRelatedModelFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
    )> | null }
    & { __typename: 'Report' }
  ) | null> | null }
  & { __typename: 'ReportComparisonBlock' }
);

export type ActionMainContentBlocksFragment = ActionMainContentBlocks_ActionContactFormBlock_Fragment | ActionMainContentBlocks_ActionContentAttributeTypeBlock_Fragment | ActionMainContentBlocks_ActionContentCategoryTypeBlock_Fragment | ActionMainContentBlocks_ActionContentSectionBlock_Fragment | ActionMainContentBlocks_Pm7qvkEswOj3HalNkYhsetHyZj7fjuxRq5zDrUiKNw_Fragment | ActionMainContentBlocks_ActionLinksBlock_ActionMergedActionsBlock_ActionRelatedIndicatorsBlock_Fragment | ActionMainContentBlocks_ActionOfficialNameBlock_Fragment | ActionMainContentBlocks_ChangeLogMessageBlock_Fragment | ActionMainContentBlocks_IndicatorCausalChainBlock_Fragment | ActionMainContentBlocks_PlanDatasetsBlock_Fragment | ActionMainContentBlocks_ReportComparisonBlock_Fragment;

export type ReportComparisonBlockActionContentFragment = (
  { reportField: string | null, reportType: (
    { id: string, name: string }
    & { __typename: 'ReportType' }
  ) | null, reportsToCompare: Array<(
    { identifier: string, name: string, startDate: string, endDate: string, valuesForAction: Array<(
      { attribute: (
        { id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, indicatorRelationships: Array<(
                  { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                    { id: string }
                    & { __typename: 'Indicator' }
                  ) }
                  & { __typename: 'IndicatorCategoryRelationship' }
                )>, iconImage: (
                  { id: string, rendition: (
                    { id: string, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'AttributeCategoryChoice' }
      ) | (
        { text: string | null, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), choice: (
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        ) | null }
        & { __typename: 'AttributeChoice' }
      ) | (
        { id: string, numericValue: number, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      ) | null, field: (
        { field: string }
        & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
      ) }
      & { __typename: 'ActionAttributeReportValue' }
    ) | (
      { field: (
        { field: string }
        & { __typename: 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryReportFieldBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionImplementationPhaseReportFieldBlock' | 'ActionManualStatusReasonBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleContinuousBlock' | 'ActionStartDateBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' | 'ActionUpdatedAtBlock' }
      ) }
      & { __typename: 'ActionCategoryReportValue' | 'ActionDateFieldReportValue' | 'ActionDateTimeFieldReportValue' | 'ActionImplementationPhaseReportValue' | 'ActionResponsiblePartyReportValue' | 'ActionSimpleFieldReportValue' | 'ActionSingleRelatedModelFieldReportValue' | 'ActionStatusReportValue' | 'ActionTasksReportValue' }
    )> | null }
    & { __typename: 'Report' }
  ) | null> | null }
  & { __typename: 'ReportComparisonBlock' }
);

export type ActionCardWithDependencyRoleFragment = (
  { id: string, identifier: string, name: string, viewUrl: string, color: string | null, scheduleContinuous: boolean, completion: number | null, dependencyRole: (
    { id: string, name: string }
    & { __typename: 'ActionDependencyRole' }
  ) | null, status: (
    { id: string, identifier: string, name: string, color: string }
    & { __typename: 'ActionStatus' }
  ) | null, categories: Array<(
    { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
      { id: string, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    ) | null, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, indicators: Array<(
      { id: string, values: Array<(
        { id: string, date: string | null, value: number }
        & { __typename: 'IndicatorValue' }
      )>, goals: Array<(
        { id: string, date: string | null, value: number }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) }
      & { __typename: 'Indicator' }
    )>, indicatorRelationships: Array<(
      { id: string, type: IndicatorCategoryRelationshipType, indicator: (
        { id: string }
        & { __typename: 'Indicator' }
      ) }
      & { __typename: 'IndicatorCategoryRelationship' }
    )>, iconImage: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, categoryPage: (
      { id: string | null, title: string, urlPath: string, live: boolean }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ), attributes: Array<(
      { id: string, key: string }
      & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, key: string }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )>, parent: (
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, indicatorRelationships: Array<(
        { id: string, type: IndicatorCategoryRelationshipType, indicator: (
          { id: string }
          & { __typename: 'Indicator' }
        ) }
        & { __typename: 'IndicatorCategoryRelationship' }
      )>, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Category' }
    ) | null }
    & { __typename: 'Category' }
  )>, statusSummary: (
    { identifier: ActionStatusSummaryIdentifier }
    & { __typename: 'ActionStatusSummary' }
  ), implementationPhase: (
    { id: string, identifier: string, name: string }
    & { __typename: 'ActionImplementationPhase' }
  ) | null, primaryOrg: (
    { id: string, abbreviation: string | null, name: string, logo: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null }
    & { __typename: 'Organization' }
  ) | null, mergedWith: (
    { id: string, identifier: string, viewUrl: string, plan: (
      { id: string, shortName: string | null, name: string, versionName: string, viewUrl: string | null }
      & { __typename: 'Plan' }
    ) }
    & { __typename: 'Action' }
  ) | null, plan: (
    { id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, hideActionIdentifiers: boolean, publishedAt: string | null, image: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null }
    & { __typename: 'Plan' }
  ) }
  & { __typename: 'Action' }
);

export type ActionListPageIncludeRelatedQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
}>;


export type ActionListPageIncludeRelatedQuery = (
  { plan: (
    { id: string, actionListPage: (
      { id: string | null, includeRelatedPlans: boolean | null }
      & { __typename: 'ActionListPage' }
    ) | null }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type ActionListPageQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  onlyWithActions: Scalars['Boolean']['input'];
}>;


export type ActionListPageQuery = (
  { plan: (
    { id: string, actionListPage: (
      { leadContent: string | null, defaultView: ActionListPageView, headingHierarchyDepth: number, includeRelatedPlans: boolean | null, id: string | null, slug: string, title: string, lastPublishedAt: string | null, primaryFilters: Array<(
        { showAllLabel: string | null, field: string, attributeType: (
          { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'ActionAttributeTypeFilterBlock' }
      ) | (
        { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
        & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
          { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
            { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
              { id: string }
              & { __typename: 'Category' }
            ) | null, common: (
              { id: string }
              & { __typename: 'CommonCategory' }
            ) | null }
            & { __typename: 'Category' }
          )> }
          & { __typename: 'CategoryType' }
        ) | null }
        & { __typename: 'CategoryTypeFilterBlock' }
      ) | (
        { id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
        & { __typename: 'ContinuousActionFilterBlock' }
      )> | null, mainFilters: Array<(
        { showAllLabel: string | null, field: string, attributeType: (
          { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'ActionAttributeTypeFilterBlock' }
      ) | (
        { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
        & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
          { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
            { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
              { id: string }
              & { __typename: 'Category' }
            ) | null, common: (
              { id: string }
              & { __typename: 'CommonCategory' }
            ) | null }
            & { __typename: 'Category' }
          )> }
          & { __typename: 'CategoryType' }
        ) | null }
        & { __typename: 'CategoryTypeFilterBlock' }
      ) | (
        { id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
        & { __typename: 'ContinuousActionFilterBlock' }
      )> | null, advancedFilters: Array<(
        { showAllLabel: string | null, field: string, attributeType: (
          { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'ActionAttributeTypeFilterBlock' }
      ) | (
        { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
        & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
      ) | (
        { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
          { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
            { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
              { id: string }
              & { __typename: 'Category' }
            ) | null, common: (
              { id: string }
              & { __typename: 'CommonCategory' }
            ) | null }
            & { __typename: 'Category' }
          )> }
          & { __typename: 'CategoryType' }
        ) | null }
        & { __typename: 'CategoryTypeFilterBlock' }
      ) | (
        { id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
        & { __typename: 'ContinuousActionFilterBlock' }
      )> | null }
      & { __typename: 'ActionListPage' }
    ) | null }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type TemplatedCategoryPageFragment = (
  { id: string | null, layout: (
    { id: string | null, iconSize: string | null, layoutMainTop: Array<(
      { attributeType: (
        { id: string, identifier: string }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'CategoryPageAttributeTypeBlock' }
    ) | (
      { blocks: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' } | { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ContinuousActionFilterBlock' } | { __typename: 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroAdditionalSettingsBlock' } | { __typename: 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' } | { __typename: 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' } | { __typename: 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { value: string }
        & { __typename: 'ChoiceBlock' }
      )> }
      & { __typename: 'CategoryPageProgressBlock' }
    ) | (
      { id: string | null, heading: string | null, pathsTargetNodeId: string | null }
      & { __typename: 'PathsNodeSummaryBlock' }
    )> | null, layoutMainBottom: Array<(
      { attributeType: (
        { id: string, identifier: string }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'CategoryPageAttributeTypeBlock' }
    ) | { __typename: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' } | (
      { id: string | null, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, fields: Array<(
        { id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<(
          { choiceLabel: string | null, choiceValue: string | null }
          & { __typename: 'FormChoiceBlock' }
        )> }
        & { __typename: 'FormFieldBlock' }
      )> }
      & { __typename: 'CategoryPageContactFormBlock' }
    ) | (
      { id: string | null, heading: string | null, helpText: string | null, datasetSchema: (
        { uuid: string }
        & { __typename: 'DatasetSchema' }
      ) }
      & { __typename: 'CategoryTypeDatasetsBlock' }
    ) | (
      { fieldLabel: string | null, fieldHelpText: string | null }
      & { __typename: 'ChangeLogMessageBlock' }
    )> | null }
    & { __typename: 'CategoryTypePageLevelLayout' }
  ) | null }
  & { __typename: 'CategoryPage' }
);

export type PlanDatasetsBlockFragment = (
  { uuid: string, schema: (
    { uuid: string, name: string, timeResolution: string, metrics: Array<(
      { unit: string }
      & { __typename: 'DatasetMetricNode' }
    )>, dimensions: Array<(
      { order: number, dimension: (
        { name: string, uuid: string, categories: Array<(
          { uuid: string, label: string }
          & { __typename: 'DatasetsDimensionCategory' }
        )> }
        & { __typename: 'DatasetsDimension' }
      ) }
      & { __typename: 'DatasetSchemaDimension' }
    )> }
    & { __typename: 'DatasetSchema' }
  ) | null, dataPoints: Array<(
    { uuid: string, value: number | null, date: string, dimensionCategories: Array<(
      { uuid: string, label: string, dimension: (
        { uuid: string }
        & { __typename: 'DatasetsDimension' }
      ) }
      & { __typename: 'DatasetsDimensionCategory' }
    )> }
    & { __typename: 'DataPoint' }
  )> }
  & { __typename: 'Dataset' }
);

export type ContentPageQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  path: Scalars['String']['input'];
  onlyWithActions?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type ContentPageQuery = (
  { planPage: (
    { id: string | null, slug: string, title: string, lastPublishedAt: string | null, body: Array<(
      { id: string | null, blockType: string, field: string }
      & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementPreparationInformationBlock' }
    ) | (
      { blockType: string, field: string }
      & { __typename: 'AccessibilityStatementContactFormBlock' }
    ) | (
      { id: string | null, blockType: string, field: string, blocks: Array<(
        { field: string }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { field: string }
        & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' }
      ) | (
        { field: string }
        & { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' }
      ) | (
        { field: string }
        & { __typename: 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroAdditionalSettingsBlock' }
      ) | (
        { field: string }
        & { __typename: 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' }
      ) | (
        { field: string }
        & { __typename: 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' }
      ) | (
        { field: string }
        & { __typename: 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { value: string, field: string }
        & { __typename: 'CharBlock' }
      )> }
      & { __typename: 'AccessibilityStatementContactInformationBlock' }
    ) | (
      { value: string, blockType: string, field: string }
      & { __typename: 'RichTextBlock' }
    )> | null }
    & { __typename: 'AccessibilityStatementPage' }
  ) | (
    { leadContent: string | null, defaultView: ActionListPageView, headingHierarchyDepth: number, includeRelatedPlans: boolean | null, id: string | null, slug: string, title: string, lastPublishedAt: string | null, primaryFilters: Array<(
      { showAllLabel: string | null, field: string, attributeType: (
        { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        )> }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'ActionAttributeTypeFilterBlock' }
    ) | (
      { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
      & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
    ) | (
      { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
        { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
          { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
            { id: string }
            & { __typename: 'Category' }
          ) | null, common: (
            { id: string }
            & { __typename: 'CommonCategory' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'CategoryType' }
      ) | null }
      & { __typename: 'CategoryTypeFilterBlock' }
    ) | (
      { id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
      & { __typename: 'ContinuousActionFilterBlock' }
    )> | null, mainFilters: Array<(
      { showAllLabel: string | null, field: string, attributeType: (
        { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        )> }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'ActionAttributeTypeFilterBlock' }
    ) | (
      { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
      & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
    ) | (
      { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
        { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
          { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
            { id: string }
            & { __typename: 'Category' }
          ) | null, common: (
            { id: string }
            & { __typename: 'CommonCategory' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'CategoryType' }
      ) | null }
      & { __typename: 'CategoryTypeFilterBlock' }
    ) | (
      { id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
      & { __typename: 'ContinuousActionFilterBlock' }
    )> | null, advancedFilters: Array<(
      { showAllLabel: string | null, field: string, attributeType: (
        { id: string, identifier: string, format: AttributeTypeFormat, name: string, helpText: string, choiceOptions: Array<(
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        )> }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'ActionAttributeTypeFilterBlock' }
    ) | (
      { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
      & { __typename: 'ActionImplementationPhaseFilterBlock' | 'ActionScheduleFilterBlock' | 'ActionStatusFilterBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'ResponsiblePartyFilterBlock' }
    ) | (
      { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
        { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
          { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
            { id: string }
            & { __typename: 'Category' }
          ) | null, common: (
            { id: string }
            & { __typename: 'CommonCategory' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'CategoryType' }
      ) | null }
      & { __typename: 'CategoryTypeFilterBlock' }
    ) | (
      { id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, field: string }
      & { __typename: 'ContinuousActionFilterBlock' }
    )> | null }
    & { __typename: 'ActionListPage' }
  ) | (
    { id: string | null, slug: string, title: string, lastPublishedAt: string | null, category: (
      { id: string, identifier: string, name: string, kausalPathsNodeUuid: string, leadParagraph: string, color: string, iconSvgUrl: string | null, categoryPage: (
        { id: string | null, urlPath: string }
        & { __typename: 'CategoryPage' }
      ) | null, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, type: (
        { id: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, fullMedium: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, fullSmall: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, social: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string }
        & { __typename: 'Indicator' }
      )>, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, children: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      )>, parent: (
        { id: string, identifier: string, name: string, color: string, iconSvgUrl: string | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, fullMedium: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, fullSmall: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, social: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), parent: (
          { id: string, identifier: string, name: string, categoryPage: (
            { id: string | null, urlPath: string }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), parent: (
            { id: string, identifier: string, name: string, parent: (
              { id: string, identifier: string, name: string, categoryPage: (
                { id: string | null, urlPath: string }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), parent: (
                { id: string, identifier: string, name: string, categoryPage: (
                  { id: string | null, urlPath: string }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ) }
                & { __typename: 'Category' }
              ) | null }
              & { __typename: 'Category' }
            ) | null, categoryPage: (
              { id: string | null, urlPath: string }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ) }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      ) | null, attributes: Array<(
        { id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, indicatorRelationships: Array<(
                  { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                    { id: string }
                    & { __typename: 'Indicator' }
                  ) }
                  & { __typename: 'IndicatorCategoryRelationship' }
                )>, iconImage: (
                  { id: string, rendition: (
                    { id: string, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'AttributeCategoryChoice' }
      ) | (
        { text: string | null, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), choice: (
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        ) | null }
        & { __typename: 'AttributeChoice' }
      ) | (
        { id: string, numericValue: number, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )>, datasets: Array<(
        { uuid: string, schema: (
          { uuid: string, name: string, timeResolution: string, metrics: Array<(
            { unit: string }
            & { __typename: 'DatasetMetricNode' }
          )>, dimensions: Array<(
            { order: number, dimension: (
              { name: string, uuid: string, categories: Array<(
                { uuid: string, label: string }
                & { __typename: 'DatasetsDimensionCategory' }
              )> }
              & { __typename: 'DatasetsDimension' }
            ) }
            & { __typename: 'DatasetSchemaDimension' }
          )> }
          & { __typename: 'DatasetSchema' }
        ) | null, dataPoints: Array<(
          { uuid: string, value: number | null, date: string, dimensionCategories: Array<(
            { uuid: string, label: string, dimension: (
              { uuid: string }
              & { __typename: 'DatasetsDimension' }
            ) }
            & { __typename: 'DatasetsDimensionCategory' }
          )> }
          & { __typename: 'DataPoint' }
        )> }
        & { __typename: 'Dataset' }
      )>, changeLogMessage: (
        { content: string | null, updatedAt: string | null, createdBy: (
          { id: string, firstName: string, lastName: string, avatarUrl: string | null }
          & { __typename: 'Person' }
        ) | null }
        & { __typename: 'ActionChangeLogMessage' | 'CategoryChangeLogMessage' | 'IndicatorChangeLogMessage' | 'PageChangeLogMessage' }
      ) | null }
      & { __typename: 'Category' }
    ) | null, body: Array<(
      { id: string | null, heading: string | null, helpText: string | null, blockType: string, field: string, categoryFilter: (
        { id: string }
        & { __typename: 'Category' }
      ) | null, groupByCategoryLevel: (
        { id: string }
        & { __typename: 'CategoryLevel' }
      ) | null }
      & { __typename: 'ActionListBlock' }
    ) | (
      { title: string | null, description: string | null, fullWidth: boolean | null, blockType: string, field: string, embed: (
        { html: string | null }
        & { __typename: 'EmbedHTMLValue' }
      ) | null }
      & { __typename: 'AdaptiveEmbedBlock' }
    ) | (
      { style: string | null, heading: string | null, lead: string | null, blockType: string, field: string, categoryType: (
        { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, indicatorRelationships: Array<(
                  { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                    { id: string }
                    & { __typename: 'Indicator' }
                  ) }
                  & { __typename: 'IndicatorCategoryRelationship' }
                )>, iconImage: (
                  { id: string, rendition: (
                    { id: string, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'CategoryType' }
      ) | null, category: (
        { id: string, children: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'CategoryListBlock' }
    ) | (
      { fieldLabel: string | null, fieldHelpText: string | null, blockType: string, field: string }
      & { __typename: 'ChangeLogMessageBlock' }
    ) | (
      { blockType: string, field: string, id: string | null, blocks: Array<(
        { blockType: string }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ChoiceBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ContinuousActionFilterBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { text: string | null, blockType: string }
        & { __typename: 'DashboardHeaderBlock' | 'DashboardParagraphBlock' }
      ) | (
        { id: string | null, helpText: string | null, blockType: string, showTotalLine: boolean | null, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null, dimension: (
          { id: string, name: string, categories: Array<(
            { id: string, name: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'Dimension' }
        ) | null, chartSeries: Array<(
          { dimensionCategory: (
            { id: string, name: string, defaultColor: string }
            & { __typename: 'DimensionCategory' }
          ) | null, values: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null> }
          & { __typename: 'DashboardIndicatorChartSeries' }
        ) | null> | null }
        & { __typename: 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorLineChartBlock' }
      ) | (
        { id: string | null, helpText: string | null, blockType: string, barType: string | null, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null, dimension: (
          { id: string, name: string, categories: Array<(
            { id: string, name: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'Dimension' }
        ) | null, chartSeries: Array<(
          { dimensionCategory: (
            { id: string, name: string, defaultColor: string }
            & { __typename: 'DimensionCategory' }
          ) | null, values: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null> }
          & { __typename: 'DashboardIndicatorChartSeries' }
        ) | null> | null }
        & { __typename: 'DashboardIndicatorBarChartBlock' }
      ) | (
        { helpText: string | null, blockType: string, year: number | null, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null, dimension: (
          { id: string, name: string, categories: Array<(
            { id: string, name: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'Dimension' }
        ) | null, chartSeries: Array<(
          { dimensionCategory: (
            { id: string, name: string, defaultColor: string }
            & { __typename: 'DimensionCategory' }
          ) | null, values: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null> }
          & { __typename: 'DashboardIndicatorChartSeries' }
        ) | null> | null }
        & { __typename: 'DashboardIndicatorPieChartBlock' }
      ) | (
        { id: string | null, blockType: string, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'DashboardIndicatorSummaryBlock' }
      )> }
      & { __typename: 'DashboardRowBlock' }
    ) | (
      { title: string | null, blockType: string, field: string, indicators: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' } | { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ChoiceBlock' } | { __typename: 'ContinuousActionFilterBlock' | 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' } | { __typename: 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' } | { __typename: 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' } | { __typename: 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { style: string | null, indicator: (
          { id: string, identifier: string | null, name: string, description: string | null, timeResolution: IndicatorTimeResolution, level: string | null, unit: (
            { id: string, name: string }
            & { __typename: 'Unit' }
          ), latestValue: (
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'IndicatorBlock' }
      ) | null> | null }
      & { __typename: 'IndicatorGroupBlock' }
    ) | (
      { heading: string | null, blockType: string, field: string, questions: Array<(
        { question: string, answer: string }
        & { __typename: 'QuestionBlock' }
      )> | null }
      & { __typename: 'QuestionAnswerBlock' }
    ) | (
      { blockType: string, field: string }
      & { __typename: 'RelatedIndicatorsBlock' }
    ) | (
      { value: string, blockType: string, field: string }
      & { __typename: 'RichTextBlock' }
    )> | null, layout: (
      { id: string | null, iconSize: string | null, layoutMainTop: Array<(
        { attributeType: (
          { id: string, identifier: string }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'CategoryPageAttributeTypeBlock' }
      ) | (
        { blocks: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' } | { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ContinuousActionFilterBlock' } | { __typename: 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroAdditionalSettingsBlock' } | { __typename: 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' } | { __typename: 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' } | { __typename: 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
          { value: string }
          & { __typename: 'ChoiceBlock' }
        )> }
        & { __typename: 'CategoryPageProgressBlock' }
      ) | (
        { id: string | null, heading: string | null, pathsTargetNodeId: string | null }
        & { __typename: 'PathsNodeSummaryBlock' }
      )> | null, layoutMainBottom: Array<(
        { attributeType: (
          { id: string, identifier: string }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'CategoryPageAttributeTypeBlock' }
      ) | { __typename: 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' } | (
        { id: string | null, heading: string | null, description: string | null, emailVisible: boolean | null, emailRequired: boolean | null, feedbackVisible: boolean | null, feedbackRequired: boolean | null, fields: Array<(
          { id: string | null, fieldLabel: string | null, fieldType: string | null, fieldRequired: boolean | null, choices: Array<(
            { choiceLabel: string | null, choiceValue: string | null }
            & { __typename: 'FormChoiceBlock' }
          )> }
          & { __typename: 'FormFieldBlock' }
        )> }
        & { __typename: 'CategoryPageContactFormBlock' }
      ) | (
        { id: string | null, heading: string | null, helpText: string | null, datasetSchema: (
          { uuid: string }
          & { __typename: 'DatasetSchema' }
        ) }
        & { __typename: 'CategoryTypeDatasetsBlock' }
      ) | (
        { fieldLabel: string | null, fieldHelpText: string | null }
        & { __typename: 'ChangeLogMessageBlock' }
      )> | null }
      & { __typename: 'CategoryTypePageLevelLayout' }
    ) | null }
    & { __typename: 'CategoryPage' }
  ) | (
    { contentType: string, id: string | null, slug: string, title: string, lastPublishedAt: string | null }
    & { __typename: 'CategoryTypePage' }
  ) | (
    { id: string | null, slug: string, title: string, lastPublishedAt: string | null }
    & { __typename: 'EmptyPage' | 'ImpactGroupPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' }
  ) | (
    { id: string | null, slug: string, title: string, lastPublishedAt: string | null, leadContent: string | null, displayInsights: boolean | null, displayLevel: boolean | null, includeRelatedPlans: boolean | null, listColumns: Array<(
      { id: string | null, columnLabel: string | null, columnHelpText: string | null, categoryType: (
        { id: string, name: string }
        & { __typename: 'CategoryType' }
      ), categoryLevel: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null }
      & { __typename: 'IndicatorCategoryColumn' }
    ) | (
      { id: string | null, columnLabel: string | null, columnHelpText: string | null, sourceField: IndicatorDashboardFieldName | null }
      & { __typename: 'IndicatorListColumn' }
    ) | (
      { id: string | null, columnLabel: string | null, columnHelpText: string | null, sourceField: IndicatorDashboardFieldName | null, isNormalized: boolean, valueType: IndicatorColumnValueType, defaultYear: number | null, hideUnit: boolean, highlightGoalMet: boolean }
      & { __typename: 'IndicatorValueColumn' }
    )> | null, primaryFilters: Array<(
      { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
        { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
          { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
            { id: string }
            & { __typename: 'Category' }
          ) | null, common: (
            { id: string }
            & { __typename: 'CommonCategory' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'CategoryType' }
      ) | null }
      & { __typename: 'CategoryTypeFilterBlock' }
    ) | (
      { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, sourceField: IndicatorList_FiltersFieldName | null, field: string }
      & { __typename: 'IndicatorFilterBlock' }
    )> | null, mainFilters: Array<(
      { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
        { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
          { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
            { id: string }
            & { __typename: 'Category' }
          ) | null, common: (
            { id: string }
            & { __typename: 'CommonCategory' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'CategoryType' }
      ) | null }
      & { __typename: 'CategoryTypeFilterBlock' }
    ) | (
      { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, sourceField: IndicatorList_FiltersFieldName | null, field: string }
      & { __typename: 'IndicatorFilterBlock' }
    )> | null, advancedFilters: Array<(
      { style: string | null, showAllLabel: string | null, depth: number | null, field: string, categoryType: (
        { id: string, identifier: string, name: string, hideCategoryIdentifiers: boolean, selectionType: CategoryTypeSelectWidget, helpText: string, categories: Array<(
          { id: string, identifier: string, name: string, order: number, helpText: string, parent: (
            { id: string }
            & { __typename: 'Category' }
          ) | null, common: (
            { id: string }
            & { __typename: 'CommonCategory' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'CategoryType' }
      ) | null }
      & { __typename: 'CategoryTypeFilterBlock' }
    ) | (
      { fieldLabel: string | null, fieldHelpText: string | null, showAllLabel: string | null, sourceField: IndicatorList_FiltersFieldName | null, field: string }
      & { __typename: 'IndicatorFilterBlock' }
    )> | null }
    & { __typename: 'IndicatorListPage' }
  ) | (
    { leadContent: string | null, id: string | null, slug: string, title: string, lastPublishedAt: string | null }
    & { __typename: 'PrivacyPolicyPage' }
  ) | (
    { leadParagraph: string | null, id: string | null, slug: string, title: string, lastPublishedAt: string | null, changeLogMessage: (
      { id: string, content: string | null, createdAt: string | null, createdBy: (
        { id: string, firstName: string, lastName: string, avatarUrl: string | null }
        & { __typename: 'Person' }
      ) | null }
      & { __typename: 'PageChangeLogMessage' }
    ) | null, headerImage: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, fullMedium: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, fullSmall: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, social: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, body: Array<(
      { title: string | null, description: string | null, fullWidth: boolean | null, blockType: string, field: string, embed: (
        { html: string | null }
        & { __typename: 'EmbedHTMLValue' }
      ) | null }
      & { __typename: 'AdaptiveEmbedBlock' }
    ) | (
      { styleOverrides: string | null, blockType: string, field: string, cartographyStyle: string | null, account: (
        { provider: CartographyProviderCredentialsProvider, account: string, publicAccessToken: string }
        & { __typename: 'CartographyProviderCredentials' }
      ) }
      & { __typename: 'CartographyVisualisationBlock' }
    ) | (
      { style: string | null, heading: string | null, lead: string | null, blockType: string, field: string, categoryType: (
        { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, indicatorRelationships: Array<(
                  { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                    { id: string }
                    & { __typename: 'Indicator' }
                  ) }
                  & { __typename: 'IndicatorCategoryRelationship' }
                )>, iconImage: (
                  { id: string, rendition: (
                    { id: string, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'CategoryType' }
      ) | null, category: (
        { id: string, children: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'CategoryListBlock' }
    ) | (
      { heading: string | null, lead: string | null, blockType: string, field: string, valueAttribute: (
        { id: string, identifier: string, unit: (
          { id: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ), treeMapCategoryType: (
        { id: string, identifier: string }
        & { __typename: 'CategoryType' }
      ) }
      & { __typename: 'CategoryTreeMapBlock' }
    ) | (
      { heading: string | null, helpText: string | null, pathsTargetNodeId: string | null, blockType: string, field: string, categoryLevel: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ), groupByCategoryLevel: (
        { id: string }
        & { __typename: 'CategoryLevel' }
      ) | null, categoryBlockType: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, indicators: Array<(
            { id: string, name: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, indicatorRelationships: Array<(
                  { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                    { id: string }
                    & { __typename: 'Indicator' }
                  ) }
                  & { __typename: 'IndicatorCategoryRelationship' }
                )>, iconImage: (
                  { id: string, rendition: (
                    { id: string, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'CategoryType' }
      ) }
      & { __typename: 'CategoryTypeLevelListBlock' }
    ) | (
      { fieldLabel: string | null, fieldHelpText: string | null, blockType: string, field: string }
      & { __typename: 'ChangeLogMessageBlock' }
    ) | (
      { blockType: string, field: string, id: string | null, blocks: Array<(
        { blockType: string }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ChoiceBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ContinuousActionFilterBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { text: string | null, blockType: string }
        & { __typename: 'DashboardHeaderBlock' | 'DashboardParagraphBlock' }
      ) | (
        { id: string | null, helpText: string | null, blockType: string, showTotalLine: boolean | null, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null, dimension: (
          { id: string, name: string, categories: Array<(
            { id: string, name: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'Dimension' }
        ) | null, chartSeries: Array<(
          { dimensionCategory: (
            { id: string, name: string, defaultColor: string }
            & { __typename: 'DimensionCategory' }
          ) | null, values: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null> }
          & { __typename: 'DashboardIndicatorChartSeries' }
        ) | null> | null }
        & { __typename: 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorLineChartBlock' }
      ) | (
        { id: string | null, helpText: string | null, blockType: string, barType: string | null, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null, dimension: (
          { id: string, name: string, categories: Array<(
            { id: string, name: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'Dimension' }
        ) | null, chartSeries: Array<(
          { dimensionCategory: (
            { id: string, name: string, defaultColor: string }
            & { __typename: 'DimensionCategory' }
          ) | null, values: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null> }
          & { __typename: 'DashboardIndicatorChartSeries' }
        ) | null> | null }
        & { __typename: 'DashboardIndicatorBarChartBlock' }
      ) | (
        { helpText: string | null, blockType: string, year: number | null, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null, dimension: (
          { id: string, name: string, categories: Array<(
            { id: string, name: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'Dimension' }
        ) | null, chartSeries: Array<(
          { dimensionCategory: (
            { id: string, name: string, defaultColor: string }
            & { __typename: 'DimensionCategory' }
          ) | null, values: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null> }
          & { __typename: 'DashboardIndicatorChartSeries' }
        ) | null> | null }
        & { __typename: 'DashboardIndicatorPieChartBlock' }
      ) | (
        { id: string | null, blockType: string, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'DashboardIndicatorSummaryBlock' }
      )> }
      & { __typename: 'DashboardRowBlock' }
    ) | (
      { title: string | null, blockType: string, field: string, indicators: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' } | { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ChoiceBlock' } | { __typename: 'ContinuousActionFilterBlock' | 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' } | { __typename: 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' } | { __typename: 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' } | { __typename: 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { style: string | null, indicator: (
          { id: string, identifier: string | null, name: string, description: string | null, timeResolution: IndicatorTimeResolution, level: string | null, unit: (
            { id: string, name: string }
            & { __typename: 'Unit' }
          ), latestValue: (
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'IndicatorBlock' }
      ) | null> | null }
      & { __typename: 'IndicatorGroupBlock' }
    ) | (
      { width: string | null, blockType: string, field: string, image: (
        { id: string, title: string, altText: string, width: number, height: number, imageCredit: string, renditionUncropped: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'LargeImageBlock' }
    ) | (
      { heading: string | null, helpText: string | null, outcomeNodeId: string | null, blockType: string, field: string }
      & { __typename: 'PathsOutcomeBlock' }
    ) | (
      { heading: string | null, blockType: string, field: string, questions: Array<(
        { question: string, answer: string }
        & { __typename: 'QuestionBlock' }
      )> | null }
      & { __typename: 'QuestionAnswerBlock' }
    ) | (
      { value: string, blockType: string, field: string }
      & { __typename: 'RichTextBlock' }
    )> | null, siblings: Array<(
      { id: string | null, title: string, slug: string, live: boolean, urlPath: string }
      & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
    )>, parent: (
      { id: string | null, title: string, slug: string, urlPath: string, children: Array<(
        { id: string | null, title: string, slug: string, live: boolean, urlPath: string }
        & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      )> }
      & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' }
    ) | (
      { childrenUseSecondaryNavigation: boolean | null, id: string | null, title: string, slug: string, urlPath: string, children: Array<(
        { id: string | null, title: string, slug: string, live: boolean, urlPath: string }
        & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      )> }
      & { __typename: 'EmptyPage' | 'StaticPage' }
    ) | null }
    & { __typename: 'StaticPage' }
  ) | null }
  & { __typename: 'Query' }
);

export type CategoryParentFragment = (
  { id: string, parent: (
    { id: string, identifier: string, name: string, categoryPage: (
      { id: string | null, urlPath: string }
      & { __typename: 'CategoryPage' }
    ) | null, type: (
      { id: string, hideCategoryIdentifiers: boolean }
      & { __typename: 'CategoryType' }
    ) }
    & { __typename: 'Category' }
  ) | null }
  & { __typename: 'Category' }
);

export type RecursiveCategoryParentFragment = (
  { id: string, parent: (
    { id: string, parent: (
      { id: string, identifier: string, name: string, parent: (
        { id: string, identifier: string, name: string, categoryPage: (
          { id: string | null, urlPath: string }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), parent: (
          { id: string, identifier: string, name: string, categoryPage: (
            { id: string | null, urlPath: string }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ) }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      ) | null, categoryPage: (
        { id: string | null, urlPath: string }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ) }
      & { __typename: 'Category' }
    ) | null }
    & { __typename: 'Category' }
  ) | null }
  & { __typename: 'Category' }
);

export type DomainSiteVerificationQueryVariables = Exact<{
  hostname: Scalars['String']['input'];
}>;


export type DomainSiteVerificationQuery = (
  { plansForHostname: Array<(
    { domain: (
      { id: string, googleSiteVerificationTag: string | null }
      & { __typename: 'PlanDomain' }
    ) | null }
    & { __typename: 'Plan' | 'RestrictedPlanNode' }
  )> | null }
  & { __typename: 'Query' }
);

export type HomePageQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  path: Scalars['String']['input'];
}>;


export type HomePageQuery = (
  { planPage: (
    { id: string | null, slug: string, lastPublishedAt: string | null }
    & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
  ) | (
    { id: string | null, slug: string, lastPublishedAt: string | null, changeLogMessage: (
      { id: string, content: string | null, createdAt: string | null, createdBy: (
        { id: string, firstName: string, lastName: string, avatarUrl: string | null }
        & { __typename: 'Person' }
      ) | null }
      & { __typename: 'PageChangeLogMessage' }
    ) | null, body: Array<(
      { blockType: string, field: string, cards: Array<(
        { heading: string | null, lead: string | null, category: (
          { id: string, type: (
            { id: string, identifier: string }
            & { __typename: 'CategoryType' }
          ) }
          & { __typename: 'Category' }
        ) }
        & { __typename: 'ActionCategoryFilterCardBlock' }
      )> | null }
      & { __typename: 'ActionCategoryFilterCardsBlock' }
    ) | (
      { blockType: string, field: string }
      & { __typename: 'ActionHighlightsBlock' | 'ActionStatusGraphsBlock' | 'IndicatorHighlightsBlock' | 'RelatedPlanListBlock' }
    ) | (
      { title: string | null, description: string | null, fullWidth: boolean | null, blockType: string, field: string, embed: (
        { html: string | null }
        & { __typename: 'EmbedHTMLValue' }
      ) | null }
      & { __typename: 'AdaptiveEmbedBlock' }
    ) | (
      { heading: string | null, lead: string | null, blockType: string, field: string, cards: Array<(
        { heading: string | null, content: string | null, link: string | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'CardBlock' }
      )> | null }
      & { __typename: 'CardListBlock' }
    ) | (
      { style: string | null, heading: string | null, lead: string | null, blockType: string, field: string, categoryType: (
        { id: string, hideCategoryIdentifiers: boolean, categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, indicatorRelationships: Array<(
                  { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                    { id: string }
                    & { __typename: 'Indicator' }
                  ) }
                  & { __typename: 'IndicatorCategoryRelationship' }
                )>, iconImage: (
                  { id: string, rendition: (
                    { id: string, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'CategoryType' }
      ) | null, category: (
        { id: string, children: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'CategoryListBlock' }
    ) | (
      { heading: string | null, lead: string | null, blockType: string, field: string, valueAttribute: (
        { id: string, identifier: string, unit: (
          { id: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null }
        & { __typename: 'AttributeType' }
      ), treeMapCategoryType: (
        { id: string, identifier: string }
        & { __typename: 'CategoryType' }
      ) }
      & { __typename: 'CategoryTreeMapBlock' }
    ) | (
      { fieldLabel: string | null, fieldHelpText: string | null, blockType: string, field: string }
      & { __typename: 'ChangeLogMessageBlock' }
    ) | (
      { blockType: string, field: string, id: string | null, blocks: Array<(
        { blockType: string }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ChoiceBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ContinuousActionFilterBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { text: string | null, blockType: string }
        & { __typename: 'DashboardHeaderBlock' | 'DashboardParagraphBlock' }
      ) | (
        { id: string | null, helpText: string | null, blockType: string, showTotalLine: boolean | null, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null, dimension: (
          { id: string, name: string, categories: Array<(
            { id: string, name: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'Dimension' }
        ) | null, chartSeries: Array<(
          { dimensionCategory: (
            { id: string, name: string, defaultColor: string }
            & { __typename: 'DimensionCategory' }
          ) | null, values: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null> }
          & { __typename: 'DashboardIndicatorChartSeries' }
        ) | null> | null }
        & { __typename: 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorLineChartBlock' }
      ) | (
        { id: string | null, helpText: string | null, blockType: string, barType: string | null, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null, dimension: (
          { id: string, name: string, categories: Array<(
            { id: string, name: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'Dimension' }
        ) | null, chartSeries: Array<(
          { dimensionCategory: (
            { id: string, name: string, defaultColor: string }
            & { __typename: 'DimensionCategory' }
          ) | null, values: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null> }
          & { __typename: 'DashboardIndicatorChartSeries' }
        ) | null> | null }
        & { __typename: 'DashboardIndicatorBarChartBlock' }
      ) | (
        { helpText: string | null, blockType: string, year: number | null, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null, dimension: (
          { id: string, name: string, categories: Array<(
            { id: string, name: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'Dimension' }
        ) | null, chartSeries: Array<(
          { dimensionCategory: (
            { id: string, name: string, defaultColor: string }
            & { __typename: 'DimensionCategory' }
          ) | null, values: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null> }
          & { __typename: 'DashboardIndicatorChartSeries' }
        ) | null> | null }
        & { __typename: 'DashboardIndicatorPieChartBlock' }
      ) | (
        { id: string | null, blockType: string, indicator: (
          { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, value: number, date: string | null }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'DashboardIndicatorSummaryBlock' }
      )> }
      & { __typename: 'DashboardRowBlock' }
    ) | (
      { layout: string, heading: string | null, lead: string | null, blockType: string, field: string, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, fullMedium: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, fullSmall: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, additionalSettings: (
        { backgroundColour: string | null, fitImage: boolean | null, showImageAccent: boolean | null, backgroundCoversFullSection: boolean | null }
        & { __typename: 'FrontPageHeroAdditionalSettingsBlock' }
      ) | null }
      & { __typename: 'FrontPageHeroBlock' }
    ) | (
      { title: string | null, blockType: string, field: string, indicators: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' } | { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ChoiceBlock' } | { __typename: 'ContinuousActionFilterBlock' | 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' } | { __typename: 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' } | { __typename: 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' } | { __typename: 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' } | (
        { style: string | null, indicator: (
          { id: string, identifier: string | null, name: string, description: string | null, timeResolution: IndicatorTimeResolution, level: string | null, unit: (
            { id: string, name: string }
            & { __typename: 'Unit' }
          ), latestValue: (
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          ) | null, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null }
          & { __typename: 'Indicator' }
        ) | null }
        & { __typename: 'IndicatorBlock' }
      ) | null> | null }
      & { __typename: 'IndicatorGroupBlock' }
    ) | (
      { title: string | null, body: string | null, significantDigits: number | null, indicatorIsNormalized: boolean | null, blockType: string, field: string, blocks: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' } | { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' } | { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ChoiceBlock' } | { __typename: 'ContinuousActionFilterBlock' | 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' } | { __typename: 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' } | { __typename: 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' } | { __typename: 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }>, indicator: (
        { id: string, identifier: string | null, name: string, minValue: number | null, maxValue: number | null, unit: (
          { id: string, shortName: string | null, name: string }
          & { __typename: 'Unit' }
        ), latestValue: (
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        ) | null, values: Array<(
          { id: string, date: string | null, value: number, normalizedValues: Array<(
            { normalizerId: string | null, value: number | null }
            & { __typename: 'NormalizedValue' }
          )>, categories: Array<(
            { id: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number, normalizedValues: Array<(
            { normalizerId: string | null, value: number | null }
            & { __typename: 'NormalizedValue' }
          )> }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, common: (
          { id: string, normalizations: Array<(
            { unit: (
              { id: string, shortName: string | null, name: string }
              & { __typename: 'Unit' }
            ), normalizer: (
              { name: string, id: string, identifier: string | null }
              & { __typename: 'CommonIndicator' }
            ) }
            & { __typename: 'CommonIndicatorNormalization' }
          )> }
          & { __typename: 'CommonIndicator' }
        ) | null }
        & { __typename: 'Indicator' }
      ) | null, linkButton: (
        { blockType: string }
        & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ChoiceBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ContinuousActionFilterBlock' | 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'IndicatorsColumnBlock' | 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' }
      ) | (
        { blockType: string }
        & { __typename: 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { text: string | null, blockType: string, page: (
          { id: string | null, url: string | null, urlPath: string, slug: string }
          & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) | null }
        & { __typename: 'PageLinkBlock' }
      ) | null }
      & { __typename: 'IndicatorShowcaseBlock' }
    ) | (
      { width: string | null, blockType: string, field: string, image: (
        { id: string, title: string, altText: string, width: number, height: number, imageCredit: string, renditionUncropped: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'LargeImageBlock' }
    ) | (
      { heading: string | null, helpText: string | null, outcomeNodeId: string | null, blockType: string, field: string }
      & { __typename: 'PathsOutcomeBlock' }
    ) | (
      { value: string, blockType: string, field: string }
      & { __typename: 'RichTextBlock' }
    )> }
    & { __typename: 'PlanRootPage' }
  ) | null, plan: (
    { id: string, primaryActionClassification: (
      { id: string, categories: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, color: string, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { live: boolean, id: string | null, title: string, urlPath: string }
          & { __typename: 'CategoryPage' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, parent: (
          { id: string }
          & { __typename: 'Category' }
        ) | null, type: (
          { id: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ) }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    ) | null }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type IndicatorGraphDataQueryVariables = Exact<{
  id: InputMaybe<Scalars['ID']['input']>;
  plan: InputMaybe<Scalars['ID']['input']>;
}>;


export type IndicatorGraphDataQuery = (
  { plan: (
    { id: string, scenarios: Array<(
      { id: string, identifier: string, name: string }
      & { __typename: 'Scenario' }
    )> }
    & { __typename: 'Plan' }
  ) | null, indicator: (
    { id: string, name: string, timeResolution: IndicatorTimeResolution, showTrendline: boolean, showTotalLine: boolean, desiredTrend: IndicatorDesiredTrend | null, reference: string | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, valueRounding: number | null, dataCategoriesAreStackable: boolean, nonQuantifiedGoal: IndicatorNonQuantifiedGoal | null, nonQuantifiedGoalDate: string | null, organization: (
      { id: string, name: string, abbreviation: string | null }
      & { __typename: 'Organization' }
    ), quantity: (
      { id: string, name: string }
      & { __typename: 'Quantity' }
    ) | null, values: Array<(
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )>, categories: Array<(
        { id: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'IndicatorValue' }
    )>, referenceValue: (
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )> }
      & { __typename: 'IndicatorValue' }
    ) | null, dimensions: Array<(
      { id: string, dimension: (
        { id: string, name: string, categories: Array<(
          { id: string, name: string, defaultColor: string }
          & { __typename: 'DimensionCategory' }
        )> }
        & { __typename: 'Dimension' }
      ) }
      & { __typename: 'IndicatorDimension' }
    )>, goals: Array<(
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )>, scenario: (
        { id: string }
        & { __typename: 'Scenario' }
      ) | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, datasets: Array<(
      { uuid: string, schema: (
        { uuid: string, metrics: Array<(
          { label: string, unit: string, isComputed: boolean }
          & { __typename: 'DatasetMetricNode' }
        )> }
        & { __typename: 'DatasetSchema' }
      ) | null, computedDataPoints: Array<(
        { date: string, value: number | null, metric: (
          { label: string, unit: string }
          & { __typename: 'DatasetMetricNode' }
        ) }
        & { __typename: 'ComputedDataPointNode' }
      )> }
      & { __typename: 'Dataset' }
    )>, unit: (
      { id: string, name: string, shortName: string | null, verboseName: string | null, verboseNamePlural: string | null }
      & { __typename: 'Unit' }
    ), common: (
      { id: string, name: string, normalizations: Array<(
        { unit: (
          { id: string, shortName: string | null }
          & { __typename: 'Unit' }
        ), normalizer: (
          { name: string, id: string, identifier: string | null }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'CommonIndicatorNormalization' }
      )>, indicators: Array<(
        { id: string, timeResolution: IndicatorTimeResolution, minValue: number | null, maxValue: number | null, organization: (
          { id: string, name: string, abbreviation: string | null }
          & { __typename: 'Organization' }
        ), quantity: (
          { id: string, name: string }
          & { __typename: 'Quantity' }
        ) | null, values: Array<(
          { id: string, date: string | null, value: number, normalizedValues: Array<(
            { normalizerId: string | null, value: number | null }
            & { __typename: 'NormalizedValue' }
          )>, categories: Array<(
            { id: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'IndicatorValue' }
        )>, dimensions: Array<(
          { id: string, dimension: (
            { id: string, name: string, categories: Array<(
              { id: string, name: string, defaultColor: string }
              & { __typename: 'DimensionCategory' }
            )> }
            & { __typename: 'Dimension' }
          ) }
          & { __typename: 'IndicatorDimension' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number, normalizedValues: Array<(
            { normalizerId: string | null, value: number | null }
            & { __typename: 'NormalizedValue' }
          )>, scenario: (
            { id: string }
            & { __typename: 'Scenario' }
          ) | null }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null, verboseName: string | null, verboseNamePlural: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )> }
      & { __typename: 'CommonIndicator' }
    ) | null }
    & { __typename: 'Indicator' }
  ) | null }
  & { __typename: 'Query' }
);

export type IndicatorListQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  relatedPlanIndicators: Scalars['Boolean']['input'];
}>;


export type IndicatorListQuery = (
  { plan: (
    { id: string, hasIndicatorRelationships: boolean | null, features: (
      { hasActionPrimaryOrgs: boolean }
      & { __typename: 'PlanFeatures' }
    ), categoryTypes: Array<(
      { name: string, id: string, identifier: string, categories: Array<(
        { id: string, identifier: string, order: number, name: string, parent: (
          { id: string }
          & { __typename: 'Category' }
        ) | null, common?: (
          { id: string, type: (
            { identifier: string, name: string }
            & { __typename: 'CommonCategoryType' }
          ) }
          & { __typename: 'CommonCategory' }
        ) | null }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'CategoryType' }
    )> }
    & { __typename: 'Plan' }
  ) | null, planIndicators?: Array<(
    { level: string | null, id: string, name: string, timeResolution: IndicatorTimeResolution, desiredTrend: IndicatorDesiredTrend | null, valueRounding: number | null, sortKey: string | null, nonQuantifiedGoal: IndicatorNonQuantifiedGoal | null, nonQuantifiedGoalDate: string | null, organization: (
      { id: string, name: string }
      & { __typename: 'Organization' }
    ), common: (
      { id: string, name: string, normalizations: Array<(
        { unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ), normalizer: (
          { name: string, id: string, identifier: string | null }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'CommonIndicatorNormalization' }
      )>, relatedCauses: Array<(
        { id: string, effectType: RelatedCommonIndicatorEffectType, causalIndicator: (
          { id: string }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'RelatedCommonIndicator' }
      )>, relatedEffects: Array<(
        { id: string, effectType: RelatedCommonIndicatorEffectType, effectIndicator: (
          { id: string }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'RelatedCommonIndicator' }
      )> }
      & { __typename: 'CommonIndicator' }
    ) | null, categories: Array<(
      { id: string, name: string, color: string, parent: (
        { id: string, name: string, color: string, level: (
          { id: string }
          & { __typename: 'CategoryLevel' }
        ) | null }
        & { __typename: 'Category' }
      ) | null, type: (
        { id: string, identifier: string }
        & { __typename: 'CategoryType' }
      ), level: (
        { id: string }
        & { __typename: 'CategoryLevel' }
      ) | null, common: (
        { id: string, type: (
          { name: string, identifier: string }
          & { __typename: 'CommonCategoryType' }
        ) }
        & { __typename: 'CommonCategory' }
      ) | null }
      & { __typename: 'Category' }
    )>, latestValue: (
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )> }
      & { __typename: 'IndicatorValue' }
    ) | null, referenceValue: (
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )> }
      & { __typename: 'IndicatorValue' }
    ) | null, dimensions: Array<(
      { id: string, dimension: (
        { id: string, name: string, categories: Array<(
          { id: string, name: string }
          & { __typename: 'DimensionCategory' }
        )> }
        & { __typename: 'Dimension' }
      ) }
      & { __typename: 'IndicatorDimension' }
    )>, values: Array<(
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )>, categories: Array<(
        { id: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'IndicatorValue' }
    )>, goals: Array<(
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )>, scenario: (
        { id: string }
        & { __typename: 'Scenario' }
      ) | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ), plans: Array<(
      { id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null }
      & { __typename: 'Plan' }
    )> }
    & { __typename: 'Indicator' }
  )> | null, relatedPlanIndicators?: Array<(
    { level: string | null, id: string, name: string, timeResolution: IndicatorTimeResolution, desiredTrend: IndicatorDesiredTrend | null, valueRounding: number | null, sortKey: string | null, nonQuantifiedGoal: IndicatorNonQuantifiedGoal | null, nonQuantifiedGoalDate: string | null, organization: (
      { id: string, name: string }
      & { __typename: 'Organization' }
    ), common: (
      { id: string, name: string, normalizations: Array<(
        { unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ), normalizer: (
          { name: string, id: string, identifier: string | null }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'CommonIndicatorNormalization' }
      )>, relatedCauses: Array<(
        { id: string, effectType: RelatedCommonIndicatorEffectType, causalIndicator: (
          { id: string }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'RelatedCommonIndicator' }
      )>, relatedEffects: Array<(
        { id: string, effectType: RelatedCommonIndicatorEffectType, effectIndicator: (
          { id: string }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'RelatedCommonIndicator' }
      )> }
      & { __typename: 'CommonIndicator' }
    ) | null, categories: Array<(
      { id: string, name: string, color: string, parent: (
        { id: string, name: string, color: string, level: (
          { id: string }
          & { __typename: 'CategoryLevel' }
        ) | null }
        & { __typename: 'Category' }
      ) | null, type: (
        { id: string, identifier: string }
        & { __typename: 'CategoryType' }
      ), level: (
        { id: string }
        & { __typename: 'CategoryLevel' }
      ) | null, common: (
        { id: string, type: (
          { name: string, identifier: string }
          & { __typename: 'CommonCategoryType' }
        ) }
        & { __typename: 'CommonCategory' }
      ) | null }
      & { __typename: 'Category' }
    )>, latestValue: (
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )> }
      & { __typename: 'IndicatorValue' }
    ) | null, referenceValue: (
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )> }
      & { __typename: 'IndicatorValue' }
    ) | null, dimensions: Array<(
      { id: string, dimension: (
        { id: string, name: string, categories: Array<(
          { id: string, name: string }
          & { __typename: 'DimensionCategory' }
        )> }
        & { __typename: 'Dimension' }
      ) }
      & { __typename: 'IndicatorDimension' }
    )>, values: Array<(
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )>, categories: Array<(
        { id: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'IndicatorValue' }
    )>, goals: Array<(
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )>, scenario: (
        { id: string }
        & { __typename: 'Scenario' }
      ) | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ), plans: Array<(
      { id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null }
      & { __typename: 'Plan' }
    )> }
    & { __typename: 'Indicator' }
  )> | null }
  & { __typename: 'Query' }
);

export type IndicatorDetailsQueryVariables = Exact<{
  id: InputMaybe<Scalars['ID']['input']>;
  plan: InputMaybe<Scalars['ID']['input']>;
  sitePlan: InputMaybe<Scalars['ID']['input']>;
}>;


export type IndicatorDetailsQuery = (
  { plan: (
    { id: string, identifier: string, indicatorListPage: (
      { id: string | null, detailsMainTop: Array<(
        { id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, categoryType: (
          { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
            { id: string, order: number, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          )> }
          & { __typename: 'CategoryType' }
        ) }
        & { __typename: 'IndicatorCategoryContentBlock' }
      ) | (
        { id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, sourceField: IndicatorDetailsFieldName | null }
        & { __typename: 'IndicatorContentBlock' }
      ) | (
        { id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null }
        & { __typename: 'IndicatorFactorValueSummaryContentBlock' }
      ) | (
        { id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, showReferenceValue: boolean | null, referenceYear: number | null, defaultGoalYear: number | null, showCurrentValue: boolean | null, showGoalValue: boolean | null, showGoalGap: boolean | null }
        & { __typename: 'IndicatorValueSummaryContentBlock' }
      ) | (
        { id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showFactorValues: boolean | null }
        & { __typename: 'IndicatorVisualizationContentBlock' }
      )> | null, detailsMainBottom: Array<(
        { id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, categoryType: (
          { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
            { id: string, order: number, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          )> }
          & { __typename: 'CategoryType' }
        ) }
        & { __typename: 'IndicatorCategoryContentBlock' }
      ) | (
        { id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, sourceField: IndicatorDetailsFieldName | null }
        & { __typename: 'IndicatorContentBlock' }
      ) | (
        { id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null }
        & { __typename: 'IndicatorFactorValueSummaryContentBlock' }
      ) | (
        { id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, showReferenceValue: boolean | null, referenceYear: number | null, defaultGoalYear: number | null, showCurrentValue: boolean | null, showGoalValue: boolean | null, showGoalGap: boolean | null }
        & { __typename: 'IndicatorValueSummaryContentBlock' }
      ) | (
        { id: string | null, fieldLabel: string | null, fieldHelpText: string | null, showFactorValues: boolean | null }
        & { __typename: 'IndicatorVisualizationContentBlock' }
      )> | null, detailsAside: Array<(
        { id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, categoryType: (
          { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
            { id: string, order: number, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          )> }
          & { __typename: 'CategoryType' }
        ) }
        & { __typename: 'IndicatorCategoryContentBlock' }
      ) | (
        { id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, sourceField: IndicatorDetailsFieldName | null }
        & { __typename: 'IndicatorContentBlock' }
      ) | (
        { id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, showReferenceValue: boolean | null, referenceYear: number | null, defaultGoalYear: number | null, showCurrentValue: boolean | null, showGoalValue: boolean | null, showGoalGap: boolean | null }
        & { __typename: 'IndicatorValueSummaryContentBlock' }
      )> | null }
      & { __typename: 'IndicatorListPage' }
    ) | null }
    & { __typename: 'Plan' }
  ) | null, indicator: (
    { id: string, identifier: string | null, name: string, hideIndicatorGraph: boolean, hideIndicatorTable: boolean, level: string | null, description: string | null, goalDescription: string | null, reference: string | null, timeResolution: IndicatorTimeResolution, valueRounding: number | null, updatedAt: string, desiredTrend: IndicatorDesiredTrend | null, nonQuantifiedGoal: IndicatorNonQuantifiedGoal | null, nonQuantifiedGoalDate: string | null, referenceValue: (
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )> }
      & { __typename: 'IndicatorValue' }
    ) | null, organization: (
      { id: string, name: string, abbreviation: string | null, classification: (
        { id: string, name: string }
        & { __typename: 'OrganizationClass' }
      ) | null, logo: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Organization' }
    ), categories: Array<(
      { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, name: string, identifier: string, hideCategoryIdentifiers: boolean, helpText: string, levels: Array<(
          { id: string, order: number, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        )> }
        & { __typename: 'CategoryType' }
      ), parent: (
        { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, order: number, color: string, iconSvgUrl: string | null, helpText: string, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, name: string, identifier: string, hideCategoryIdentifiers: boolean, helpText: string, levels: Array<(
                { id: string, order: number, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              )> }
              & { __typename: 'CategoryType' }
            ) }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, name: string, identifier: string, hideCategoryIdentifiers: boolean, helpText: string, levels: Array<(
              { id: string, order: number, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            )> }
            & { __typename: 'CategoryType' }
          ) }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, name: string, identifier: string, hideCategoryIdentifiers: boolean, helpText: string, levels: Array<(
            { id: string, order: number, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          )> }
          & { __typename: 'CategoryType' }
        ) }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'Category' }
    )>, common: (
      { id: string, indicators: Array<(
        { id: string, identifier: string | null, organization: (
          { id: string, name: string, abbreviation: string | null, classification: (
            { id: string, name: string }
            & { __typename: 'OrganizationClass' }
          ) | null, logo: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Organization' }
        ) }
        & { __typename: 'Indicator' }
      )> }
      & { __typename: 'CommonIndicator' }
    ) | null, unit: (
      { id: string, name: string, shortName: string | null, verboseName: string | null, verboseNamePlural: string | null }
      & { __typename: 'Unit' }
    ), latestGraph: (
      { id: string }
      & { __typename: 'IndicatorGraph' }
    ) | null, values: Array<(
      { id: string, date: string | null, value: number }
      & { __typename: 'IndicatorValue' }
    )>, goals: Array<(
      { id: string, date: string | null, value: number, scenario: (
        { id: string }
        & { __typename: 'Scenario' }
      ) | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, datasets: Array<(
      { uuid: string, schema: (
        { uuid: string, name: string, metrics: Array<(
          { label: string, unit: string, isComputed: boolean }
          & { __typename: 'DatasetMetricNode' }
        )> }
        & { __typename: 'DatasetSchema' }
      ) | null, computedDataPoints: Array<(
        { date: string, value: number | null, metric: (
          { label: string, unit: string }
          & { __typename: 'DatasetMetricNode' }
        ) }
        & { __typename: 'ComputedDataPointNode' }
      )> }
      & { __typename: 'Dataset' }
    )>, actions: Array<(
      { id: string, identifier: string, name: string, color: string | null, viewUrl: string, scheduleContinuous: boolean, completion: number | null, status: (
        { id: string, identifier: string, name: string, color: string }
        & { __typename: 'ActionStatus' }
      ) | null, implementationPhase: (
        { id: string, identifier: string, name: string }
        & { __typename: 'ActionImplementationPhase' }
      ) | null, statusSummary: (
        { identifier: ActionStatusSummaryIdentifier, label: string, isActive: boolean, isCompleted: boolean, sentiment: Sentiment }
        & { __typename: 'ActionStatusSummary' }
      ), mergedWith: (
        { id: string, identifier: string, viewUrl: string, plan: (
          { id: string, shortName: string | null, viewUrl: string | null }
          & { __typename: 'Plan' }
        ) }
        & { __typename: 'Action' }
      ) | null, plan: (
        { id: string, viewUrl: string | null }
        & { __typename: 'Plan' }
      ), categories: Array<(
        { id: string, identifier: string, name: string, image: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Category' }
      )>, impact: (
        { id: string, identifier: string, name: string }
        & { __typename: 'ActionImpact' }
      ) | null }
      & { __typename: 'Action' }
    )>, relatedCauses: Array<(
      { id: string, effectType: RelatedIndicatorEffectType, confidenceLevel: RelatedIndicatorConfidenceLevel, causalIndicator: (
        { id: string, name: string, level: string | null, plans: Array<(
          { id: string, identifier: string, viewUrl: string | null, parent: (
            { id: string, identifier: string }
            & { __typename: 'Plan' }
          ) | null }
          & { __typename: 'Plan' }
        )> }
        & { __typename: 'Indicator' }
      ) }
      & { __typename: 'RelatedIndicator' }
    )>, relatedEffects: Array<(
      { id: string, effectType: RelatedIndicatorEffectType, confidenceLevel: RelatedIndicatorConfidenceLevel, effectIndicator: (
        { id: string, name: string, level: string | null, plans: Array<(
          { id: string, identifier: string, viewUrl: string | null, parent: (
            { id: string, identifier: string }
            & { __typename: 'Plan' }
          ) | null }
          & { __typename: 'Plan' }
        )> }
        & { __typename: 'Indicator' }
      ) }
      & { __typename: 'RelatedIndicator' }
    )>, plans: Array<(
      { id: string, identifier: string, name: string, shortName: string | null, versionName: string, publishedAt: string | null, supersededBy: (
        { id: string }
        & { __typename: 'Plan' }
      ) | null, allRelatedPlans: Array<(
        { id: string }
        & { __typename: 'Plan' }
      )>, relatedPlans: Array<(
        { id: string }
        & { __typename: 'Plan' }
      )>, supersededPlans: Array<(
        { id: string }
        & { __typename: 'Plan' }
      )>, supersedingPlans: Array<(
        { id: string }
        & { __typename: 'Plan' }
      )>, parent: (
        { id: string }
        & { __typename: 'Plan' }
      ) | null, children: Array<(
        { id: string }
        & { __typename: 'Plan' }
      )>, copyOf: (
        { id: string }
        & { __typename: 'Plan' }
      ) | null, copies: Array<(
        { id: string }
        & { __typename: 'Plan' }
      )> }
      & { __typename: 'Plan' }
    )>, changeLogMessage: (
      { content: string | null, updatedAt: string | null, createdBy: (
        { id: string, firstName: string, lastName: string, avatarUrl: string | null }
        & { __typename: 'Person' }
      ) | null }
      & { __typename: 'ActionChangeLogMessage' | 'CategoryChangeLogMessage' | 'IndicatorChangeLogMessage' | 'PageChangeLogMessage' }
    ) | null, defaultVisualization: (
      { showTotalLine: boolean | null, indicator: (
        { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
          { id: string, value: number, date: string | null }
          & { __typename: 'IndicatorValue' }
        ) | null, goals: Array<(
          { id: string, value: number, date: string | null }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      ), dimension: (
        { id: string, name: string, categories: Array<(
          { id: string, name: string }
          & { __typename: 'DimensionCategory' }
        )> }
        & { __typename: 'Dimension' }
      ) | null, chartSeries: Array<(
        { dimensionCategory: (
          { id: string, name: string, defaultColor: string }
          & { __typename: 'DimensionCategory' }
        ) | null, values: Array<(
          { id: string, value: number, date: string | null }
          & { __typename: 'IndicatorValue' }
        ) | null> }
        & { __typename: 'DashboardIndicatorChartSeries' }
      )> }
      & { __typename: 'IndicatorDefaultAreaChart' | 'IndicatorDefaultLineChart' }
    ) | (
      { barType: string | null, indicator: (
        { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
          { id: string, value: number, date: string | null }
          & { __typename: 'IndicatorValue' }
        ) | null, goals: Array<(
          { id: string, value: number, date: string | null }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      ), dimension: (
        { id: string, name: string, categories: Array<(
          { id: string, name: string }
          & { __typename: 'DimensionCategory' }
        )> }
        & { __typename: 'Dimension' }
      ) | null, chartSeries: Array<(
        { dimensionCategory: (
          { id: string, name: string, defaultColor: string }
          & { __typename: 'DimensionCategory' }
        ) | null, values: Array<(
          { id: string, value: number, date: string | null }
          & { __typename: 'IndicatorValue' }
        ) | null> }
        & { __typename: 'DashboardIndicatorChartSeries' }
      )> }
      & { __typename: 'IndicatorDefaultBarChart' }
    ) | (
      { year: number | null, indicator: (
        { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
          { id: string, value: number, date: string | null }
          & { __typename: 'IndicatorValue' }
        ) | null, goals: Array<(
          { id: string, value: number, date: string | null }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      ), dimension: (
        { id: string, name: string, categories: Array<(
          { id: string, name: string }
          & { __typename: 'DimensionCategory' }
        )> }
        & { __typename: 'Dimension' }
      ) | null, chartSeries: Array<(
        { dimensionCategory: (
          { id: string, name: string, defaultColor: string }
          & { __typename: 'DimensionCategory' }
        ) | null, values: Array<(
          { id: string, value: number, date: string | null }
          & { __typename: 'IndicatorValue' }
        ) | null> }
        & { __typename: 'DashboardIndicatorChartSeries' }
      )> }
      & { __typename: 'IndicatorDefaultPieChart' }
    ) | (
      { indicator: (
        { id: string, name: string, description: string | null, showTrendline: boolean, valueRounding: number | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, timeResolution: IndicatorTimeResolution, dataCategoriesAreStackable: boolean, desiredTrend: IndicatorDesiredTrend | null, latestValue: (
          { id: string, value: number, date: string | null }
          & { __typename: 'IndicatorValue' }
        ) | null, goals: Array<(
          { id: string, value: number, date: string | null }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      ) }
      & { __typename: 'IndicatorDefaultSummary' }
    ) | null }
    & { __typename: 'Indicator' }
  ) | null }
  & { __typename: 'Query' }
);

export type ActionsTableRowFragment = (
  { id: string, identifier: string, name: string, color: string | null, viewUrl: string, scheduleContinuous: boolean, completion: number | null, status: (
    { id: string, identifier: string, name: string, color: string }
    & { __typename: 'ActionStatus' }
  ) | null, implementationPhase: (
    { id: string, identifier: string, name: string }
    & { __typename: 'ActionImplementationPhase' }
  ) | null, statusSummary: (
    { identifier: ActionStatusSummaryIdentifier, label: string, isActive: boolean, isCompleted: boolean, sentiment: Sentiment }
    & { __typename: 'ActionStatusSummary' }
  ), mergedWith: (
    { id: string, identifier: string, viewUrl: string, plan: (
      { id: string, shortName: string | null, viewUrl: string | null }
      & { __typename: 'Plan' }
    ) }
    & { __typename: 'Action' }
  ) | null, plan: (
    { id: string, viewUrl: string | null }
    & { __typename: 'Plan' }
  ), categories: Array<(
    { id: string, identifier: string, name: string, image: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null }
    & { __typename: 'Category' }
  )>, impact: (
    { id: string, identifier: string, name: string }
    & { __typename: 'ActionImpact' }
  ) | null }
  & { __typename: 'Action' }
);

export type IndicatorCategoryContentBlockFragment = (
  { id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, categoryType: (
    { id: string, name: string, identifier: string, helpText: string, hideCategoryIdentifiers: boolean, levels: Array<(
      { id: string, order: number, name: string, namePlural: string | null }
      & { __typename: 'CategoryLevel' }
    )> }
    & { __typename: 'CategoryType' }
  ) }
  & { __typename: 'IndicatorCategoryContentBlock' }
);

export type IndicatorContentBlockFragment = (
  { id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, sourceField: IndicatorDetailsFieldName | null }
  & { __typename: 'IndicatorContentBlock' }
);

export type IndicatorValueSummaryContentBlockFragment = (
  { id: string | null, blockType: string, fieldLabel: string | null, fieldHelpText: string | null, field: string, showReferenceValue: boolean | null, referenceYear: number | null, defaultGoalYear: number | null, showCurrentValue: boolean | null, showGoalValue: boolean | null, showGoalGap: boolean | null }
  & { __typename: 'IndicatorValueSummaryContentBlock' }
);

export type OrganizationDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  plan: Scalars['ID']['input'];
  clientUrl: Scalars['String']['input'];
}>;


export type OrganizationDetailsQuery = (
  { organization: (
    { id: string, name: string, abbreviation: string | null, distinctName: string | null, description: string, url: string, actionCount: number, contactPersonCount: number, classification: (
      { id: string, name: string, identifier: string }
      & { __typename: 'OrganizationClass' }
    ) | null, ancestors: Array<(
      { id: string }
      & { __typename: 'Organization' }
    ) | null> | null, plansWithActionResponsibilities: Array<(
      { id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, organization: (
        { id: string, name: string, abbreviation: string | null }
        & { __typename: 'Organization' }
      ), primaryOrgs: Array<(
        { id: string, name: string }
        & { __typename: 'Organization' }
      )>, actionImpacts: Array<(
        { id: string }
        & { __typename: 'ActionImpact' }
      )>, actionStatusSummaries: Array<(
        { identifier: ActionStatusSummaryIdentifier, label: string, isCompleted: boolean, isActive: boolean, sentiment: Sentiment }
        & { __typename: 'ActionStatusSummary' }
      )>, image: (
        { id: string, rendition: (
          { id: string, src: string, alt: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, actionImplementationPhases: Array<(
        { id: string, identifier: string, name: string, order: number }
        & { __typename: 'ActionImplementationPhase' }
      )>, actionStatuses: Array<(
        { id: string, identifier: string, name: string, isCompleted: boolean }
        & { __typename: 'ActionStatus' }
      )>, features: (
        { hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionPrimaryOrgs: boolean }
        & { __typename: 'PlanFeatures' }
      ), actions: Array<(
        { id: string, identifier: string, name: string, officialName: string | null, completion: number | null, updatedAt: string, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, order: number, attributes: Array<(
          { id: string, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) | null, choiceOptions: Array<(
              { id: string, identifier: string, name: string }
              & { __typename: 'AttributeTypeChoiceOption' }
            )> }
            & { __typename: 'AttributeType' }
          ), categories: Array<(
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )>, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                  { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                    { id: string, name: string, namePlural: string | null }
                    & { __typename: 'CategoryLevel' }
                  ) | null, image: (
                    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null, rendition: (
                      { id: string, width: number, height: number, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, indicators: Array<(
                    { id: string, values: Array<(
                      { id: string, date: string | null, value: number }
                      & { __typename: 'IndicatorValue' }
                    )>, goals: Array<(
                      { id: string, date: string | null, value: number }
                      & { __typename: 'IndicatorGoal' }
                    ) | null> | null, unit: (
                      { id: string, name: string, shortName: string | null }
                      & { __typename: 'Unit' }
                    ) }
                    & { __typename: 'Indicator' }
                  )>, indicatorRelationships: Array<(
                    { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                      { id: string }
                      & { __typename: 'Indicator' }
                    ) }
                    & { __typename: 'IndicatorCategoryRelationship' }
                  )>, iconImage: (
                    { id: string, rendition: (
                      { id: string, src: string }
                      & { __typename: 'ImageRendition' }
                    ) | null }
                    & { __typename: 'Image' }
                  ) | null, categoryPage: (
                    { id: string | null, title: string, urlPath: string, live: boolean }
                    & { __typename: 'CategoryPage' }
                  ) | null, type: (
                    { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                    & { __typename: 'CategoryType' }
                  ), attributes: Array<(
                    { id: string, key: string }
                    & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                  ) | (
                    { value: string, id: string, key: string }
                    & { __typename: 'AttributeRichText' | 'AttributeText' }
                  )> }
                  & { __typename: 'Category' }
                ) | null, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, indicatorRelationships: Array<(
                  { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                    { id: string }
                    & { __typename: 'Indicator' }
                  ) }
                  & { __typename: 'IndicatorCategoryRelationship' }
                )>, iconImage: (
                  { id: string, rendition: (
                    { id: string, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null }
            & { __typename: 'Category' }
          )> }
          & { __typename: 'AttributeCategoryChoice' }
        ) | (
          { text: string | null, id: string, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) | null, choiceOptions: Array<(
              { id: string, identifier: string, name: string }
              & { __typename: 'AttributeTypeChoiceOption' }
            )> }
            & { __typename: 'AttributeType' }
          ), choice: (
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          ) | null }
          & { __typename: 'AttributeChoice' }
        ) | (
          { id: string, numericValue: number, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) | null, choiceOptions: Array<(
              { id: string, identifier: string, name: string }
              & { __typename: 'AttributeTypeChoiceOption' }
            )> }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename: 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, type: (
            { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) | null, choiceOptions: Array<(
              { id: string, identifier: string, name: string }
              & { __typename: 'AttributeTypeChoiceOption' }
            )> }
            & { __typename: 'AttributeType' }
          ) }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )>, plan: (
          { id: string, viewUrl: string | null }
          & { __typename: 'Plan' }
        ), statusSummary: (
          { identifier: ActionStatusSummaryIdentifier }
          & { __typename: 'ActionStatusSummary' }
        ), schedule: Array<(
          { id: string }
          & { __typename: 'ActionSchedule' }
        )>, status: (
          { id: string, identifier: string, name: string, color: string }
          & { __typename: 'ActionStatus' }
        ) | null, implementationPhase: (
          { id: string, identifier: string, name: string, order: number }
          & { __typename: 'ActionImplementationPhase' }
        ) | null, impact: (
          { id: string, identifier: string }
          & { __typename: 'ActionImpact' }
        ) | null, categories: Array<(
          { id: string }
          & { __typename: 'Category' }
        )>, responsibleParties: Array<(
          { id: string, organization: (
            { id: string, abbreviation: string | null, name: string }
            & { __typename: 'Organization' }
          ) }
          & { __typename: 'ActionResponsibleParty' }
        )>, primaryOrg: (
          { id: string, abbreviation: string | null, name: string, logo: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null }
          & { __typename: 'Organization' }
        ) | null, tasks: Array<(
          { id: string, state: ActionTaskState, dueAt: string }
          & { __typename: 'ActionTask' }
        )>, mergedWith: (
          { id: string, identifier: string, plan: (
            { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
            & { __typename: 'Plan' }
          ) }
          & { __typename: 'Action' }
        ) | null, indicators: Array<(
          { id: string, goals: Array<(
            { id: string }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null }
          & { __typename: 'Indicator' }
        )>, relatedIndicators: Array<(
          { id: string, indicatesActionProgress: boolean, indicator: (
            { id: string, goals: Array<(
              { id: string }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'ActionIndicator' }
        )> }
        & { __typename: 'Action' }
      )>, generalContent: (
        { id: string, organizationTerm: SiteGeneralContentOrganizationTerm }
        & { __typename: 'SiteGeneralContent' }
      ) }
      & { __typename: 'Plan' }
    )>, parent: (
      { id: string, name: string }
      & { __typename: 'Organization' }
    ) | null, logo: (
      { id: string, altText: string, rendition: (
        { id: string, src: string, alt: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null }
    & { __typename: 'Organization' }
  ) | null, plan: (
    { id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, actionListPage: (
      { id: string | null, dashboardColumns: Array<(
        { columnLabel: string | null }
        & { __typename: 'EndDateColumnBlock' | 'IdentifierColumnBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorsColumnBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'ResponsiblePartiesColumnBlock' | 'ScheduleContinuousColumnBlock' | 'StartDateColumnBlock' | 'StatusColumnBlock' | 'TasksColumnBlock' | 'UpdatedAtColumnBlock' }
      ) | (
        { columnLabel: string | null, field: string, attributeType: (
          { id: string, format: AttributeTypeFormat, name: string, identifier: string, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )>, unit: (
            { id: string, name: string }
            & { __typename: 'Unit' }
          ) | null }
          & { __typename: 'AttributeType' }
        ) | null }
        & { __typename: 'FieldColumnBlock' }
      )> | null }
      & { __typename: 'ActionListPage' }
    ) | null, organization: (
      { id: string, name: string, abbreviation: string | null }
      & { __typename: 'Organization' }
    ), primaryOrgs: Array<(
      { id: string, name: string }
      & { __typename: 'Organization' }
    )>, actionImpacts: Array<(
      { id: string }
      & { __typename: 'ActionImpact' }
    )>, actionStatusSummaries: Array<(
      { identifier: ActionStatusSummaryIdentifier, label: string, isCompleted: boolean, isActive: boolean, sentiment: Sentiment }
      & { __typename: 'ActionStatusSummary' }
    )>, image: (
      { id: string, rendition: (
        { id: string, src: string, alt: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, actionImplementationPhases: Array<(
      { id: string, identifier: string, name: string, order: number }
      & { __typename: 'ActionImplementationPhase' }
    )>, actionStatuses: Array<(
      { id: string, identifier: string, name: string, isCompleted: boolean }
      & { __typename: 'ActionStatus' }
    )>, features: (
      { hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionPrimaryOrgs: boolean }
      & { __typename: 'PlanFeatures' }
    ), actions: Array<(
      { id: string, identifier: string, name: string, officialName: string | null, completion: number | null, updatedAt: string, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, order: number, attributes: Array<(
        { id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, indicatorRelationships: Array<(
                  { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                    { id: string }
                    & { __typename: 'Indicator' }
                  ) }
                  & { __typename: 'IndicatorCategoryRelationship' }
                )>, iconImage: (
                  { id: string, rendition: (
                    { id: string, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'AttributeCategoryChoice' }
      ) | (
        { text: string | null, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), choice: (
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        ) | null }
        & { __typename: 'AttributeChoice' }
      ) | (
        { id: string, numericValue: number, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )>, plan: (
        { id: string, viewUrl: string | null }
        & { __typename: 'Plan' }
      ), statusSummary: (
        { identifier: ActionStatusSummaryIdentifier }
        & { __typename: 'ActionStatusSummary' }
      ), schedule: Array<(
        { id: string }
        & { __typename: 'ActionSchedule' }
      )>, status: (
        { id: string, identifier: string, name: string, color: string }
        & { __typename: 'ActionStatus' }
      ) | null, implementationPhase: (
        { id: string, identifier: string, name: string, order: number }
        & { __typename: 'ActionImplementationPhase' }
      ) | null, impact: (
        { id: string, identifier: string }
        & { __typename: 'ActionImpact' }
      ) | null, categories: Array<(
        { id: string }
        & { __typename: 'Category' }
      )>, responsibleParties: Array<(
        { id: string, organization: (
          { id: string, abbreviation: string | null, name: string }
          & { __typename: 'Organization' }
        ) }
        & { __typename: 'ActionResponsibleParty' }
      )>, primaryOrg: (
        { id: string, abbreviation: string | null, name: string, logo: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'Organization' }
      ) | null, tasks: Array<(
        { id: string, state: ActionTaskState, dueAt: string }
        & { __typename: 'ActionTask' }
      )>, mergedWith: (
        { id: string, identifier: string, plan: (
          { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
          & { __typename: 'Plan' }
        ) }
        & { __typename: 'Action' }
      ) | null, indicators: Array<(
        { id: string, goals: Array<(
          { id: string }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null }
        & { __typename: 'Indicator' }
      )>, relatedIndicators: Array<(
        { id: string, indicatesActionProgress: boolean, indicator: (
          { id: string, goals: Array<(
            { id: string }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null }
          & { __typename: 'Indicator' }
        ) }
        & { __typename: 'ActionIndicator' }
      )> }
      & { __typename: 'Action' }
    )>, generalContent: (
      { id: string, organizationTerm: SiteGeneralContentOrganizationTerm }
      & { __typename: 'SiteGeneralContent' }
    ) }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type OrgContentPlanFragment = (
  { id: string, name: string, shortName: string | null, versionName: string, viewUrl: string | null, organization: (
    { id: string, name: string, abbreviation: string | null }
    & { __typename: 'Organization' }
  ), primaryOrgs: Array<(
    { id: string, name: string }
    & { __typename: 'Organization' }
  )>, actionImpacts: Array<(
    { id: string }
    & { __typename: 'ActionImpact' }
  )>, actionStatusSummaries: Array<(
    { identifier: ActionStatusSummaryIdentifier, label: string, isCompleted: boolean, isActive: boolean, sentiment: Sentiment }
    & { __typename: 'ActionStatusSummary' }
  )>, image: (
    { id: string, rendition: (
      { id: string, src: string, alt: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, actionImplementationPhases: Array<(
    { id: string, identifier: string, name: string, order: number }
    & { __typename: 'ActionImplementationPhase' }
  )>, actionStatuses: Array<(
    { id: string, identifier: string, name: string, isCompleted: boolean }
    & { __typename: 'ActionStatus' }
  )>, features: (
    { hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionPrimaryOrgs: boolean }
    & { __typename: 'PlanFeatures' }
  ), actions: Array<(
    { id: string, identifier: string, name: string, officialName: string | null, completion: number | null, updatedAt: string, scheduleContinuous: boolean, startDate: string | null, endDate: string | null, order: number, attributes: Array<(
      { id: string, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null, choiceOptions: Array<(
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        )> }
        & { __typename: 'AttributeType' }
      ), categories: Array<(
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )>, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null }
        & { __typename: 'Category' }
      )> }
      & { __typename: 'AttributeCategoryChoice' }
    ) | (
      { text: string | null, id: string, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null, choiceOptions: Array<(
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        )> }
        & { __typename: 'AttributeType' }
      ), choice: (
        { id: string, identifier: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      ) | null }
      & { __typename: 'AttributeChoice' }
    ) | (
      { id: string, numericValue: number, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null, choiceOptions: Array<(
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        )> }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeNumericValue' }
    ) | (
      { value: string, id: string, type: (
        { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) | null, choiceOptions: Array<(
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        )> }
        & { __typename: 'AttributeType' }
      ) }
      & { __typename: 'AttributeRichText' | 'AttributeText' }
    )>, plan: (
      { id: string, viewUrl: string | null }
      & { __typename: 'Plan' }
    ), statusSummary: (
      { identifier: ActionStatusSummaryIdentifier }
      & { __typename: 'ActionStatusSummary' }
    ), schedule: Array<(
      { id: string }
      & { __typename: 'ActionSchedule' }
    )>, status: (
      { id: string, identifier: string, name: string, color: string }
      & { __typename: 'ActionStatus' }
    ) | null, implementationPhase: (
      { id: string, identifier: string, name: string, order: number }
      & { __typename: 'ActionImplementationPhase' }
    ) | null, impact: (
      { id: string, identifier: string }
      & { __typename: 'ActionImpact' }
    ) | null, categories: Array<(
      { id: string }
      & { __typename: 'Category' }
    )>, responsibleParties: Array<(
      { id: string, organization: (
        { id: string, abbreviation: string | null, name: string }
        & { __typename: 'Organization' }
      ) }
      & { __typename: 'ActionResponsibleParty' }
    )>, primaryOrg: (
      { id: string, abbreviation: string | null, name: string, logo: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null }
      & { __typename: 'Organization' }
    ) | null, tasks: Array<(
      { id: string, state: ActionTaskState, dueAt: string }
      & { __typename: 'ActionTask' }
    )>, mergedWith: (
      { id: string, identifier: string, plan: (
        { id: string, shortName: string | null, versionName: string, viewUrl: string | null }
        & { __typename: 'Plan' }
      ) }
      & { __typename: 'Action' }
    ) | null, indicators: Array<(
      { id: string, goals: Array<(
        { id: string }
        & { __typename: 'IndicatorGoal' }
      ) | null> | null }
      & { __typename: 'Indicator' }
    )>, relatedIndicators: Array<(
      { id: string, indicatesActionProgress: boolean, indicator: (
        { id: string, goals: Array<(
          { id: string }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null }
        & { __typename: 'Indicator' }
      ) }
      & { __typename: 'ActionIndicator' }
    )> }
    & { __typename: 'Action' }
  )>, generalContent: (
    { id: string, organizationTerm: SiteGeneralContentOrganizationTerm }
    & { __typename: 'SiteGeneralContent' }
  ) }
  & { __typename: 'Plan' }
);

export type PlanCategoryTypesQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
}>;


export type PlanCategoryTypesQuery = (
  { plan: (
    { id: string, categoryTypes: Array<(
      { id: string, name: string, identifier: string }
      & { __typename: 'CategoryType' }
    )> }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type PlanContextQueryVariables = Exact<{
  identifier: InputMaybe<Scalars['ID']['input']>;
  hostname: InputMaybe<Scalars['String']['input']>;
  clientUrl: InputMaybe<Scalars['String']['input']>;
}>;


export type PlanContextQuery = (
  { plan: (
    { id: string, identifier: string, name: string, shortName: string | null, versionName: string, themeIdentifier: string | null, timezone: string, primaryLanguage: string, otherLanguages: Array<string>, hideActionIdentifiers: boolean, publishedAt: string | null, kausalPathsInstanceUuid: string, viewUrl: string | null, actionReportExportViewUrl: string | null, serveFileBaseUrl: string, adminUrl: string | null, accessibilityStatementUrl: string | null, externalFeedbackUrl: string | null, primaryActionClassification: (
      { id: string, identifier: string, hideCategoryIdentifiers: boolean, common: (
        { identifier: string }
        & { __typename: 'CommonCategoryType' }
      ) | null }
      & { __typename: 'CategoryType' }
    ) | null, secondaryActionClassification: (
      { id: string, identifier: string }
      & { __typename: 'CategoryType' }
    ) | null, domain: (
      { id: string, basePath: string | null, googleSiteVerificationTag: string | null, matomoAnalyticsUrl: string | null }
      & { __typename: 'PlanDomain' }
    ) | null, image: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, square: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, full: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, fullMedium: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, fullSmall: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, small: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, rendition: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, social: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, actionSchedules: Array<(
      { id: string, name: string, beginsAt: string, endsAt: string | null }
      & { __typename: 'ActionSchedule' }
    )>, actionImplementationPhases: Array<(
      { id: string, identifier: string, name: string, order: number, color: string }
      & { __typename: 'ActionImplementationPhase' }
    )>, actionDependencyRoles: Array<(
      { id: string, name: string }
      & { __typename: 'ActionDependencyRole' }
    )>, actionImpacts: Array<(
      { id: string, identifier: string, name: string, order: number }
      & { __typename: 'ActionImpact' }
    )>, actionStatuses: Array<(
      { id: string, identifier: string, name: string, isCompleted: boolean }
      & { __typename: 'ActionStatus' }
    )>, actionStatusSummaries: Array<(
      { identifier: ActionStatusSummaryIdentifier, label: string, isCompleted: boolean, isActive: boolean, sentiment: Sentiment }
      & { __typename: 'ActionStatusSummary' }
    )>, actionTimelinessClasses: Array<(
      { identifier: ActionTimelinessIdentifier, color: string, sentiment: Sentiment, comparison: Comparison, days: number }
      & { __typename: 'ActionTimeliness' }
    )>, impactGroups: Array<(
      { id: string }
      & { __typename: 'ImpactGroup' }
    )>, primaryOrgs: Array<(
      { id: string }
      & { __typename: 'Organization' }
    )>, generalContent: (
      { id: string, siteTitle: string, siteDescription: string, officialNameDescription: string, copyrightText: string, creativeCommonsLicense: string, ownerUrl: string, ownerName: string, actionTerm: SiteGeneralContentActionTerm, actionTaskTerm: SiteGeneralContentActionTaskTerm, indicatorTerm: SiteGeneralContentIndicatorTerm, organizationTerm: SiteGeneralContentOrganizationTerm, sitewideAnnouncement: string | null }
      & { __typename: 'SiteGeneralContent' }
    ), mainMenu: (
      { items: Array<(
        { linkText: string, url: string }
        & { __typename: 'ExternalLinkMenuItem' }
      ) | (
        { id: string, page: (
          { id: string | null, title: string, urlPath: string, slug: string }
          & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ), parent: (
          { id: string, page: (
            { id: string | null }
            & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
          ) }
          & { __typename: 'PageMenuItem' }
        ) | null }
        & { __typename: 'PageMenuItem' }
      )> }
      & { __typename: 'MainMenu' }
    ) | null, footer: (
      { items: Array<{ __typename: 'ExternalLinkMenuItem' } | (
        { id: string, page: (
          { id: string | null, title: string, urlPath: string, slug: string }
          & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ), parent: (
          { id: string, page: (
            { id: string | null }
            & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
          ) }
          & { __typename: 'PageMenuItem' }
        ) | null, children: Array<(
          { id: string, page: (
            { id: string | null, title: string, urlPath: string, slug: string }
            & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
          ) }
          & { __typename: 'PageMenuItem' }
        )> | null }
        & { __typename: 'PageMenuItem' }
      )> }
      & { __typename: 'Footer' }
    ) | null, features: (
      { allowPublicSiteLogin: boolean, hasActionContactPersonRoles: boolean, contactPersonsPublicData: PlanFeaturesContactPersonsPublicData, contactPersonsShowPicture: boolean, contactPersonsShowOrganizationAncestors: boolean, enableSearch: boolean, hideFromSearchEngines: boolean, hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionLeadParagraph: boolean, hasActionPrimaryOrgs: boolean, indicatorsOpenInModal: boolean, showAdminLink: boolean, enableIndicatorComparison: boolean, minimalStatuses: boolean, enableChangeLog: boolean, enableActionPdfExportInPublicUi: boolean }
      & { __typename: 'PlanFeatures' }
    ), allRelatedPlans: Array<(
      { id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null, image: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, organization: (
        { id: string, name: string }
        & { __typename: 'Organization' }
      ) }
      & { __typename: 'Plan' }
    )>, supersededBy: (
      { id: string, name: string, shortName: string | null, versionName: string, identifier: string, viewUrl: string | null, publishedAt: string | null }
      & { __typename: 'Plan' }
    ) | null, supersededPlans: Array<(
      { id: string, name: string, shortName: string | null, versionName: string, identifier: string, viewUrl: string | null, publishedAt: string | null }
      & { __typename: 'Plan' }
    )>, supersedingPlans: Array<(
      { id: string, name: string, shortName: string | null, versionName: string, identifier: string, viewUrl: string | null, publishedAt: string | null }
      & { __typename: 'Plan' }
    )>, children: Array<(
      { id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null, image: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, organization: (
        { id: string, name: string }
        & { __typename: 'Organization' }
      ) }
      & { __typename: 'Plan' }
    )>, parent: (
      { id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null, generalContent: (
        { id: string, siteTitle: string }
        & { __typename: 'SiteGeneralContent' }
      ), image: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, organization: (
        { id: string, name: string }
        & { __typename: 'Organization' }
      ) }
      & { __typename: 'Plan' }
    ) | null, additionalLinks: (
      { items: Array<{ __typename: 'ExternalLinkMenuItem' } | (
        { id: string, crossPlanLink: boolean | null, viewUrl: string | null, page: (
          { id: string | null, title: string, url: string | null, urlPath: string, slug: string, body: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'RichTextBlock' } | (
            { blocks: Array<(
              { field: string }
              & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
            ) | (
              { field: string }
              & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' }
            ) | (
              { field: string }
              & { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' }
            ) | (
              { field: string }
              & { __typename: 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroAdditionalSettingsBlock' }
            ) | (
              { field: string }
              & { __typename: 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' }
            ) | (
              { field: string }
              & { __typename: 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' }
            ) | (
              { field: string }
              & { __typename: 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
            ) | (
              { value: string, field: string }
              & { __typename: 'CharBlock' }
            )> }
            & { __typename: 'AccessibilityStatementContactInformationBlock' }
          )> | null }
          & { __typename: 'AccessibilityStatementPage' }
        ) | (
          { id: string | null, title: string, url: string | null, urlPath: string, slug: string }
          & { __typename: 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) }
        & { __typename: 'PageMenuItem' }
      )> }
      & { __typename: 'AdditionalLinks' }
    ) | null, actionListPage: (
      { id: string | null, includeRelatedPlans: boolean | null, actionDateFormat: string | null, taskDateFormat: string | null }
      & { __typename: 'ActionListPage' }
    ) | null }
    & { __typename: 'Plan' }
  ) | null, workflowStates: Array<(
    { id: string, description: string | null }
    & { __typename: 'WorkflowStateDescription' }
  ) | null> | null }
  & { __typename: 'Query' }
);

export type PlanContextFragment = (
  { id: string, identifier: string, name: string, shortName: string | null, versionName: string, themeIdentifier: string | null, timezone: string, primaryLanguage: string, otherLanguages: Array<string>, hideActionIdentifiers: boolean, publishedAt: string | null, kausalPathsInstanceUuid: string, viewUrl: string | null, actionReportExportViewUrl: string | null, serveFileBaseUrl: string, adminUrl: string | null, accessibilityStatementUrl: string | null, externalFeedbackUrl: string | null, primaryActionClassification: (
    { id: string, identifier: string, hideCategoryIdentifiers: boolean, common: (
      { identifier: string }
      & { __typename: 'CommonCategoryType' }
    ) | null }
    & { __typename: 'CategoryType' }
  ) | null, secondaryActionClassification: (
    { id: string, identifier: string }
    & { __typename: 'CategoryType' }
  ) | null, domain: (
    { id: string, basePath: string | null, googleSiteVerificationTag: string | null, matomoAnalyticsUrl: string | null }
    & { __typename: 'PlanDomain' }
  ) | null, image: (
    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, square: (
      { id: string, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, full: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, fullMedium: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, fullSmall: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, small: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, rendition: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, social: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, actionSchedules: Array<(
    { id: string, name: string, beginsAt: string, endsAt: string | null }
    & { __typename: 'ActionSchedule' }
  )>, actionImplementationPhases: Array<(
    { id: string, identifier: string, name: string, order: number, color: string }
    & { __typename: 'ActionImplementationPhase' }
  )>, actionDependencyRoles: Array<(
    { id: string, name: string }
    & { __typename: 'ActionDependencyRole' }
  )>, actionImpacts: Array<(
    { id: string, identifier: string, name: string, order: number }
    & { __typename: 'ActionImpact' }
  )>, actionStatuses: Array<(
    { id: string, identifier: string, name: string, isCompleted: boolean }
    & { __typename: 'ActionStatus' }
  )>, actionStatusSummaries: Array<(
    { identifier: ActionStatusSummaryIdentifier, label: string, isCompleted: boolean, isActive: boolean, sentiment: Sentiment }
    & { __typename: 'ActionStatusSummary' }
  )>, actionTimelinessClasses: Array<(
    { identifier: ActionTimelinessIdentifier, color: string, sentiment: Sentiment, comparison: Comparison, days: number }
    & { __typename: 'ActionTimeliness' }
  )>, impactGroups: Array<(
    { id: string }
    & { __typename: 'ImpactGroup' }
  )>, primaryOrgs: Array<(
    { id: string }
    & { __typename: 'Organization' }
  )>, generalContent: (
    { id: string, siteTitle: string, siteDescription: string, officialNameDescription: string, copyrightText: string, creativeCommonsLicense: string, ownerUrl: string, ownerName: string, actionTerm: SiteGeneralContentActionTerm, actionTaskTerm: SiteGeneralContentActionTaskTerm, indicatorTerm: SiteGeneralContentIndicatorTerm, organizationTerm: SiteGeneralContentOrganizationTerm, sitewideAnnouncement: string | null }
    & { __typename: 'SiteGeneralContent' }
  ), mainMenu: (
    { items: Array<(
      { linkText: string, url: string }
      & { __typename: 'ExternalLinkMenuItem' }
    ) | (
      { id: string, page: (
        { id: string | null, title: string, urlPath: string, slug: string }
        & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      ), parent: (
        { id: string, page: (
          { id: string | null }
          & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) }
        & { __typename: 'PageMenuItem' }
      ) | null }
      & { __typename: 'PageMenuItem' }
    )> }
    & { __typename: 'MainMenu' }
  ) | null, footer: (
    { items: Array<{ __typename: 'ExternalLinkMenuItem' } | (
      { id: string, page: (
        { id: string | null, title: string, urlPath: string, slug: string }
        & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      ), parent: (
        { id: string, page: (
          { id: string | null }
          & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) }
        & { __typename: 'PageMenuItem' }
      ) | null, children: Array<(
        { id: string, page: (
          { id: string | null, title: string, urlPath: string, slug: string }
          & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ) }
        & { __typename: 'PageMenuItem' }
      )> | null }
      & { __typename: 'PageMenuItem' }
    )> }
    & { __typename: 'Footer' }
  ) | null, features: (
    { allowPublicSiteLogin: boolean, hasActionContactPersonRoles: boolean, contactPersonsPublicData: PlanFeaturesContactPersonsPublicData, contactPersonsShowPicture: boolean, contactPersonsShowOrganizationAncestors: boolean, enableSearch: boolean, hideFromSearchEngines: boolean, hasActionIdentifiers: boolean, hasActionOfficialName: boolean, hasActionLeadParagraph: boolean, hasActionPrimaryOrgs: boolean, indicatorsOpenInModal: boolean, showAdminLink: boolean, enableIndicatorComparison: boolean, minimalStatuses: boolean, enableChangeLog: boolean, enableActionPdfExportInPublicUi: boolean }
    & { __typename: 'PlanFeatures' }
  ), allRelatedPlans: Array<(
    { id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null, image: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, organization: (
      { id: string, name: string }
      & { __typename: 'Organization' }
    ) }
    & { __typename: 'Plan' }
  )>, supersededBy: (
    { id: string, name: string, shortName: string | null, versionName: string, identifier: string, viewUrl: string | null, publishedAt: string | null }
    & { __typename: 'Plan' }
  ) | null, supersededPlans: Array<(
    { id: string, name: string, shortName: string | null, versionName: string, identifier: string, viewUrl: string | null, publishedAt: string | null }
    & { __typename: 'Plan' }
  )>, supersedingPlans: Array<(
    { id: string, name: string, shortName: string | null, versionName: string, identifier: string, viewUrl: string | null, publishedAt: string | null }
    & { __typename: 'Plan' }
  )>, children: Array<(
    { id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null, image: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, organization: (
      { id: string, name: string }
      & { __typename: 'Organization' }
    ) }
    & { __typename: 'Plan' }
  )>, parent: (
    { id: string, identifier: string, name: string, shortName: string | null, viewUrl: string | null, generalContent: (
      { id: string, siteTitle: string }
      & { __typename: 'SiteGeneralContent' }
    ), image: (
      { id: string, rendition: (
        { id: string, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null, organization: (
      { id: string, name: string }
      & { __typename: 'Organization' }
    ) }
    & { __typename: 'Plan' }
  ) | null, additionalLinks: (
    { items: Array<{ __typename: 'ExternalLinkMenuItem' } | (
      { id: string, crossPlanLink: boolean | null, viewUrl: string | null, page: (
        { id: string | null, title: string, url: string | null, urlPath: string, slug: string, body: Array<{ __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'RichTextBlock' } | (
          { blocks: Array<(
            { field: string }
            & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
          ) | (
            { field: string }
            & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' }
          ) | (
            { field: string }
            & { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'ChoiceBlock' | 'ContinuousActionFilterBlock' }
          ) | (
            { field: string }
            & { __typename: 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' | 'FrontPageHeroAdditionalSettingsBlock' }
          ) | (
            { field: string }
            & { __typename: 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' | 'IndicatorsColumnBlock' }
          ) | (
            { field: string }
            & { __typename: 'IntegerBlock' | 'LargeImageBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionAnswerBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' }
          ) | (
            { field: string }
            & { __typename: 'ResponsiblePartyFilterBlock' | 'RichTextBlock' | 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
          ) | (
            { value: string, field: string }
            & { __typename: 'CharBlock' }
          )> }
          & { __typename: 'AccessibilityStatementContactInformationBlock' }
        )> | null }
        & { __typename: 'AccessibilityStatementPage' }
      ) | (
        { id: string | null, title: string, url: string | null, urlPath: string, slug: string }
        & { __typename: 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
      ) }
      & { __typename: 'PageMenuItem' }
    )> }
    & { __typename: 'AdditionalLinks' }
  ) | null, actionListPage: (
    { id: string | null, includeRelatedPlans: boolean | null, actionDateFormat: string | null, taskDateFormat: string | null }
    & { __typename: 'ActionListPage' }
  ) | null }
  & { __typename: 'Plan' }
);

export type PlansByHostnameQueryVariables = Exact<{
  hostname: InputMaybe<Scalars['String']['input']>;
}>;


export type PlansByHostnameQuery = (
  { plansForHostname: Array<(
    { id: string, identifier: string, otherLanguages: Array<string>, primaryLanguage: string, statusMessage: string | null, loginEnabled: boolean | null, domain: (
      { id: string, hostname: string, redirectToHostname: string | null, basePath: string | null, status: PublicationStatus | null, statusMessage: string | null }
      & { __typename: 'PlanDomain' }
    ) | null, domains: Array<(
      { id: string, hostname: string, redirectToHostname: string | null, basePath: string | null, status: PublicationStatus | null, statusMessage: string | null }
      & { __typename: 'PlanDomain' }
    ) | null> | null }
    & { __typename: 'Plan' }
  ) | (
    { primaryLanguage: string, statusMessage: string | null, loginEnabled: boolean | null, domain: (
      { id: string, hostname: string, redirectToHostname: string | null, basePath: string | null, status: PublicationStatus | null, statusMessage: string | null }
      & { __typename: 'PlanDomain' }
    ) | null, domains: Array<(
      { id: string, hostname: string, redirectToHostname: string | null, basePath: string | null, status: PublicationStatus | null, statusMessage: string | null }
      & { __typename: 'PlanDomain' }
    ) | null> | null }
    & { __typename: 'RestrictedPlanNode' }
  )> | null }
  & { __typename: 'Query' }
);

export type PledgeFragment = (
  { id: string, name: string, description: string, uuid: string, slug: string, commitmentCount: number, residentCount: number | null, impactStatement: string, localEquivalency: string, image: (
    { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, fullMedium: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, fullSmall: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, small: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null, rendition: (
      { id: string, width: number, height: number, src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null, attributes: Array<(
    { id: string, type: (
      { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) | null, choiceOptions: Array<(
        { id: string, identifier: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      )> }
      & { __typename: 'AttributeType' }
    ), categories: Array<(
      { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
        { id: string, name: string, namePlural: string | null }
        & { __typename: 'CategoryLevel' }
      ) | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, indicators: Array<(
        { id: string, values: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorValue' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )>, indicatorRelationships: Array<(
        { id: string, type: IndicatorCategoryRelationshipType, indicator: (
          { id: string }
          & { __typename: 'Indicator' }
        ) }
        & { __typename: 'IndicatorCategoryRelationship' }
      )>, iconImage: (
        { id: string, rendition: (
          { id: string, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, categoryPage: (
        { id: string | null, title: string, urlPath: string, live: boolean }
        & { __typename: 'CategoryPage' }
      ) | null, type: (
        { id: string, identifier: string, hideCategoryIdentifiers: boolean }
        & { __typename: 'CategoryType' }
      ), attributes: Array<(
        { id: string, key: string }
        & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, key: string }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )>, parent: (
        { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )> }
          & { __typename: 'Category' }
        ) | null, level: (
          { id: string, name: string, namePlural: string | null }
          & { __typename: 'CategoryLevel' }
        ) | null, image: (
          { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null, rendition: (
            { id: string, width: number, height: number, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, indicators: Array<(
          { id: string, values: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorValue' }
          )>, goals: Array<(
            { id: string, date: string | null, value: number }
            & { __typename: 'IndicatorGoal' }
          ) | null> | null, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) }
          & { __typename: 'Indicator' }
        )>, indicatorRelationships: Array<(
          { id: string, type: IndicatorCategoryRelationshipType, indicator: (
            { id: string }
            & { __typename: 'Indicator' }
          ) }
          & { __typename: 'IndicatorCategoryRelationship' }
        )>, iconImage: (
          { id: string, rendition: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null, categoryPage: (
          { id: string | null, title: string, urlPath: string, live: boolean }
          & { __typename: 'CategoryPage' }
        ) | null, type: (
          { id: string, identifier: string, hideCategoryIdentifiers: boolean }
          & { __typename: 'CategoryType' }
        ), attributes: Array<(
          { id: string, key: string }
          & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
        ) | (
          { value: string, id: string, key: string }
          & { __typename: 'AttributeRichText' | 'AttributeText' }
        )> }
        & { __typename: 'Category' }
      ) | null }
      & { __typename: 'Category' }
    )> }
    & { __typename: 'AttributeCategoryChoice' }
  ) | (
    { text: string | null, id: string, type: (
      { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) | null, choiceOptions: Array<(
        { id: string, identifier: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      )> }
      & { __typename: 'AttributeType' }
    ), choice: (
      { id: string, identifier: string, name: string }
      & { __typename: 'AttributeTypeChoiceOption' }
    ) | null }
    & { __typename: 'AttributeChoice' }
  ) | (
    { id: string, numericValue: number, type: (
      { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) | null, choiceOptions: Array<(
        { id: string, identifier: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      )> }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'AttributeNumericValue' }
  ) | (
    { value: string, id: string, type: (
      { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
        { id: string, name: string, shortName: string | null }
        & { __typename: 'Unit' }
      ) | null, choiceOptions: Array<(
        { id: string, identifier: string, name: string }
        & { __typename: 'AttributeTypeChoiceOption' }
      )> }
      & { __typename: 'AttributeType' }
    ) }
    & { __typename: 'AttributeRichText' | 'AttributeText' }
  )> }
  & { __typename: 'Pledge' }
);

export type PledgesQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
}>;


export type PledgesQuery = (
  { planPage: { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PrivacyPolicyPage' | 'StaticPage' } | (
    { id: string | null, title: string, leadContent: string | null, backgroundImage: (
      { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, fullMedium: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null, fullSmall: (
        { id: string, width: number, height: number, src: string }
        & { __typename: 'ImageRendition' }
      ) | null }
      & { __typename: 'Image' }
    ) | null }
    & { __typename: 'PledgeListPage' }
  ) | null, plan: (
    { id: string, pledges: Array<(
      { id: string, name: string, description: string, uuid: string, slug: string, commitmentCount: number, residentCount: number | null, impactStatement: string, localEquivalency: string, actions: Array<(
        { id: string, identifier: string, name: string, viewUrl: string }
        & { __typename: 'Action' }
      )> | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, fullMedium: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, fullSmall: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, attributes: Array<(
        { id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, indicatorRelationships: Array<(
                  { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                    { id: string }
                    & { __typename: 'Indicator' }
                  ) }
                  & { __typename: 'IndicatorCategoryRelationship' }
                )>, iconImage: (
                  { id: string, rendition: (
                    { id: string, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'AttributeCategoryChoice' }
      ) | (
        { text: string | null, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), choice: (
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        ) | null }
        & { __typename: 'AttributeChoice' }
      ) | (
        { id: string, numericValue: number, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Pledge' }
    )> | null }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

type PledgeBody_GxIqRAgfSioH07e0TsixWfsi2QkOwIkCdae4INdPti_Fragment = (
  { blockType: string, field: string }
  & { __typename: 'AccessibilityStatementComplianceStatusBlock' | 'AccessibilityStatementContactFormBlock' | 'AccessibilityStatementContactInformationBlock' | 'AccessibilityStatementPreparationInformationBlock' | 'ActionAttributeTypeFilterBlock' | 'ActionAttributeTypeReportFieldBlock' | 'ActionCategoryFilterCardBlock' | 'ActionCategoryFilterCardsBlock' | 'ActionCategoryReportFieldBlock' | 'ActionContactFormBlock' | 'ActionContactPersonsBlock' | 'ActionContentAttributeTypeBlock' | 'ActionContentCategoryTypeBlock' | 'ActionContentSectionBlock' | 'ActionDependenciesBlock' | 'ActionDescriptionBlock' | 'ActionEndDateBlock' | 'ActionHighlightsBlock' | 'ActionImplementationPhaseFilterBlock' | 'ActionImplementationPhaseReportFieldBlock' }
);

type PledgeBody_Lrr2Fl8Se3u5PeLKw5dI21X2VgwGptdIrN1YaLxh00_Fragment = (
  { blockType: string, field: string }
  & { __typename: 'ActionLeadParagraphBlock' | 'ActionLinksBlock' | 'ActionListBlock' | 'ActionManualStatusReasonBlock' | 'ActionMergedActionsBlock' | 'ActionOfficialNameBlock' | 'ActionPledgesBlock' | 'ActionPrimaryOrgBlock' | 'ActionRelatedActionsBlock' | 'ActionRelatedIndicatorsBlock' | 'ActionResponsiblePartiesBlock' | 'ActionResponsiblePartyReportFieldBlock' | 'ActionScheduleBlock' | 'ActionScheduleContinuousBlock' | 'ActionScheduleFilterBlock' | 'ActionStartDateBlock' | 'ActionStatusFilterBlock' | 'ActionStatusGraphsBlock' | 'ActionStatusReportFieldBlock' | 'ActionTasksBlock' }
);

type PledgeBody_DCiMtWTjVHcMJlWmTrxLDb0m3cl5Ha0YuNph9nWt8E_Fragment = (
  { blockType: string, field: string }
  & { __typename: 'ActionUpdatedAtBlock' | 'AdaptiveEmbedBlock' | 'BlockQuoteBlock' | 'BooleanBlock' | 'CardBlock' | 'CardListBlock' | 'CartographyVisualisationBlock' | 'CategoryListBlock' | 'CategoryPageAttributeTypeBlock' | 'CategoryPageBodyBlock' | 'CategoryPageCategoryListBlock' | 'CategoryPageContactFormBlock' | 'CategoryPageProgressBlock' | 'CategoryTreeMapBlock' | 'CategoryTypeDatasetsBlock' | 'CategoryTypeFilterBlock' | 'CategoryTypeLevelListBlock' | 'ChangeLogMessageBlock' | 'CharBlock' | 'ChoiceBlock' }
);

type PledgeBody_O6yiIaiIXrBAuCqj4Usrc0eUxTgDeFjRkKlJwjRwna_Fragment = (
  { blockType: string, field: string }
  & { __typename: 'ContinuousActionFilterBlock' | 'DashboardHeaderBlock' | 'DashboardIndicatorAreaChartBlock' | 'DashboardIndicatorBarChartBlock' | 'DashboardIndicatorLineChartBlock' | 'DashboardIndicatorPieChartBlock' | 'DashboardIndicatorSummaryBlock' | 'DashboardParagraphBlock' | 'DashboardRowBlock' | 'DateBlock' | 'DateTimeBlock' | 'DecimalBlock' | 'DocumentChooserBlock' | 'EmailBlock' | 'EmbedBlock' | 'EndDateColumnBlock' | 'FieldColumnBlock' | 'FloatBlock' | 'FormChoiceBlock' | 'FormFieldBlock' }
);

type PledgeBody_KZmexPyDcZFmxLkcenFpyeXmtVp7H1eJxNPg02xKLs_Fragment = (
  { blockType: string, field: string }
  & { __typename: 'FrontPageHeroAdditionalSettingsBlock' | 'FrontPageHeroBlock' | 'IdentifierColumnBlock' | 'ImageBlock' | 'ImageChooserBlock' | 'ImplementationPhaseColumnBlock' | 'IndicatorBlock' | 'IndicatorCategoryColumn' | 'IndicatorCategoryContentBlock' | 'IndicatorCausalChainBlock' | 'IndicatorContentBlock' | 'IndicatorFactorValueSummaryContentBlock' | 'IndicatorFilterBlock' | 'IndicatorGroupBlock' | 'IndicatorHighlightsBlock' | 'IndicatorListColumn' | 'IndicatorShowcaseBlock' | 'IndicatorValueColumn' | 'IndicatorValueSummaryContentBlock' | 'IndicatorVisualizationContentBlock' }
);

type PledgeBody_CNtvxS0zAxTpijnH9ZeSlUeWtdDj51HzvpQ4bUg_Fragment = (
  { blockType: string, field: string }
  & { __typename: 'IndicatorsColumnBlock' | 'IntegerBlock' | 'NameColumnBlock' | 'OrganizationColumnBlock' | 'PageChooserBlock' | 'PageLinkBlock' | 'PathsNodeSummaryBlock' | 'PathsOutcomeBlock' | 'PlanDatasetsBlock' | 'PlanFilterBlock' | 'PrimaryOrganizationFilterBlock' | 'QuestionBlock' | 'RawHTMLBlock' | 'RegexBlock' | 'RelatedIndicatorsBlock' | 'RelatedPlanListBlock' | 'ReportComparisonBlock' | 'ReportTypeFieldChooserBlock' | 'ResponsiblePartiesColumnBlock' | 'ResponsiblePartyFilterBlock' }
);

type PledgeBody_8vtSixVuMrtoI07nft7JyY3uvOn1ds6gUIeEfxgMy_Fragment = (
  { blockType: string, field: string }
  & { __typename: 'ScheduleContinuousColumnBlock' | 'SnippetChooserBlock' | 'StartDateColumnBlock' | 'StaticBlock' | 'StatusColumnBlock' | 'StreamBlock' | 'StreamFieldBlock' | 'StructBlock' | 'TasksColumnBlock' | 'TextBlock' | 'TimeBlock' | 'URLBlock' | 'UpdatedAtColumnBlock' }
);

type PledgeBody_LargeImageBlock_Fragment = (
  { width: string | null, blockType: string, field: string, image: (
    { id: string, title: string, altText: string, width: number, height: number, imageCredit: string, renditionUncropped: (
      { id: string, src: string }
      & { __typename: 'ImageRendition' }
    ) | null }
    & { __typename: 'Image' }
  ) | null }
  & { __typename: 'LargeImageBlock' }
);

type PledgeBody_QuestionAnswerBlock_Fragment = (
  { heading: string | null, blockType: string, field: string, questions: Array<(
    { question: string, answer: string }
    & { __typename: 'QuestionBlock' }
  )> | null }
  & { __typename: 'QuestionAnswerBlock' }
);

type PledgeBody_RichTextBlock_Fragment = (
  { value: string, blockType: string, field: string }
  & { __typename: 'RichTextBlock' }
);

export type PledgeBodyFragment = PledgeBody_GxIqRAgfSioH07e0TsixWfsi2QkOwIkCdae4INdPti_Fragment | PledgeBody_Lrr2Fl8Se3u5PeLKw5dI21X2VgwGptdIrN1YaLxh00_Fragment | PledgeBody_DCiMtWTjVHcMJlWmTrxLDb0m3cl5Ha0YuNph9nWt8E_Fragment | PledgeBody_O6yiIaiIXrBAuCqj4Usrc0eUxTgDeFjRkKlJwjRwna_Fragment | PledgeBody_KZmexPyDcZFmxLkcenFpyeXmtVp7H1eJxNPg02xKLs_Fragment | PledgeBody_CNtvxS0zAxTpijnH9ZeSlUeWtdDj51HzvpQ4bUg_Fragment | PledgeBody_8vtSixVuMrtoI07nft7JyY3uvOn1ds6gUIeEfxgMy_Fragment | PledgeBody_LargeImageBlock_Fragment | PledgeBody_QuestionAnswerBlock_Fragment | PledgeBody_RichTextBlock_Fragment;

export type PledgeQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  slug: Scalars['String']['input'];
}>;


export type PledgeQuery = (
  { plan: (
    { id: string, pledge: (
      { id: string, name: string, description: string, uuid: string, slug: string, commitmentCount: number, residentCount: number | null, impactStatement: string, localEquivalency: string, body: Array<(
        { width: string | null, blockType: string, field: string, image: (
          { id: string, title: string, altText: string, width: number, height: number, imageCredit: string, renditionUncropped: (
            { id: string, src: string }
            & { __typename: 'ImageRendition' }
          ) | null }
          & { __typename: 'Image' }
        ) | null }
        & { __typename: 'LargeImageBlock' }
      ) | (
        { heading: string | null, blockType: string, field: string, questions: Array<(
          { question: string, answer: string }
          & { __typename: 'QuestionBlock' }
        )> | null }
        & { __typename: 'QuestionAnswerBlock' }
      ) | (
        { value: string, blockType: string, field: string }
        & { __typename: 'RichTextBlock' }
      )> | null, actions: Array<(
        { id: string, identifier: string, name: string, viewUrl: string }
        & { __typename: 'Action' }
      )> | null, image: (
        { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, full: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, fullMedium: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, fullSmall: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, small: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null, rendition: (
          { id: string, width: number, height: number, src: string }
          & { __typename: 'ImageRendition' }
        ) | null }
        & { __typename: 'Image' }
      ) | null, attributes: Array<(
        { id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), categories: Array<(
          { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
            { id: string, name: string, namePlural: string | null }
            & { __typename: 'CategoryLevel' }
          ) | null, image: (
            { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null, rendition: (
              { id: string, width: number, height: number, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, indicators: Array<(
            { id: string, values: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorValue' }
            )>, goals: Array<(
              { id: string, date: string | null, value: number }
              & { __typename: 'IndicatorGoal' }
            ) | null> | null, unit: (
              { id: string, name: string, shortName: string | null }
              & { __typename: 'Unit' }
            ) }
            & { __typename: 'Indicator' }
          )>, indicatorRelationships: Array<(
            { id: string, type: IndicatorCategoryRelationshipType, indicator: (
              { id: string }
              & { __typename: 'Indicator' }
            ) }
            & { __typename: 'IndicatorCategoryRelationship' }
          )>, iconImage: (
            { id: string, rendition: (
              { id: string, src: string }
              & { __typename: 'ImageRendition' }
            ) | null }
            & { __typename: 'Image' }
          ) | null, categoryPage: (
            { id: string | null, title: string, urlPath: string, live: boolean }
            & { __typename: 'CategoryPage' }
          ) | null, type: (
            { id: string, identifier: string, hideCategoryIdentifiers: boolean }
            & { __typename: 'CategoryType' }
          ), attributes: Array<(
            { id: string, key: string }
            & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
          ) | (
            { value: string, id: string, key: string }
            & { __typename: 'AttributeRichText' | 'AttributeText' }
          )>, parent: (
            { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
              { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, parent: (
                { id: string, identifier: string, name: string, leadParagraph: string, order: number, kausalPathsNodeUuid: string, color: string, iconSvgUrl: string | null, helpText: string, level: (
                  { id: string, name: string, namePlural: string | null }
                  & { __typename: 'CategoryLevel' }
                ) | null, image: (
                  { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null, rendition: (
                    { id: string, width: number, height: number, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, indicators: Array<(
                  { id: string, values: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorValue' }
                  )>, goals: Array<(
                    { id: string, date: string | null, value: number }
                    & { __typename: 'IndicatorGoal' }
                  ) | null> | null, unit: (
                    { id: string, name: string, shortName: string | null }
                    & { __typename: 'Unit' }
                  ) }
                  & { __typename: 'Indicator' }
                )>, indicatorRelationships: Array<(
                  { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                    { id: string }
                    & { __typename: 'Indicator' }
                  ) }
                  & { __typename: 'IndicatorCategoryRelationship' }
                )>, iconImage: (
                  { id: string, rendition: (
                    { id: string, src: string }
                    & { __typename: 'ImageRendition' }
                  ) | null }
                  & { __typename: 'Image' }
                ) | null, categoryPage: (
                  { id: string | null, title: string, urlPath: string, live: boolean }
                  & { __typename: 'CategoryPage' }
                ) | null, type: (
                  { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                  & { __typename: 'CategoryType' }
                ), attributes: Array<(
                  { id: string, key: string }
                  & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
                ) | (
                  { value: string, id: string, key: string }
                  & { __typename: 'AttributeRichText' | 'AttributeText' }
                )> }
                & { __typename: 'Category' }
              ) | null, level: (
                { id: string, name: string, namePlural: string | null }
                & { __typename: 'CategoryLevel' }
              ) | null, image: (
                { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null, rendition: (
                  { id: string, width: number, height: number, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, indicators: Array<(
                { id: string, values: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorValue' }
                )>, goals: Array<(
                  { id: string, date: string | null, value: number }
                  & { __typename: 'IndicatorGoal' }
                ) | null> | null, unit: (
                  { id: string, name: string, shortName: string | null }
                  & { __typename: 'Unit' }
                ) }
                & { __typename: 'Indicator' }
              )>, indicatorRelationships: Array<(
                { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                  { id: string }
                  & { __typename: 'Indicator' }
                ) }
                & { __typename: 'IndicatorCategoryRelationship' }
              )>, iconImage: (
                { id: string, rendition: (
                  { id: string, src: string }
                  & { __typename: 'ImageRendition' }
                ) | null }
                & { __typename: 'Image' }
              ) | null, categoryPage: (
                { id: string | null, title: string, urlPath: string, live: boolean }
                & { __typename: 'CategoryPage' }
              ) | null, type: (
                { id: string, identifier: string, hideCategoryIdentifiers: boolean }
                & { __typename: 'CategoryType' }
              ), attributes: Array<(
                { id: string, key: string }
                & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
              ) | (
                { value: string, id: string, key: string }
                & { __typename: 'AttributeRichText' | 'AttributeText' }
              )> }
              & { __typename: 'Category' }
            ) | null, level: (
              { id: string, name: string, namePlural: string | null }
              & { __typename: 'CategoryLevel' }
            ) | null, image: (
              { id: string, title: string, altText: string, imageCredit: string, width: number, height: number, focalPointX: number | null, focalPointY: number | null, focalPointWidth: number | null, focalPointHeight: number | null, small: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null, rendition: (
                { id: string, width: number, height: number, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, indicators: Array<(
              { id: string, values: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorValue' }
              )>, goals: Array<(
                { id: string, date: string | null, value: number }
                & { __typename: 'IndicatorGoal' }
              ) | null> | null, unit: (
                { id: string, name: string, shortName: string | null }
                & { __typename: 'Unit' }
              ) }
              & { __typename: 'Indicator' }
            )>, indicatorRelationships: Array<(
              { id: string, type: IndicatorCategoryRelationshipType, indicator: (
                { id: string }
                & { __typename: 'Indicator' }
              ) }
              & { __typename: 'IndicatorCategoryRelationship' }
            )>, iconImage: (
              { id: string, rendition: (
                { id: string, src: string }
                & { __typename: 'ImageRendition' }
              ) | null }
              & { __typename: 'Image' }
            ) | null, categoryPage: (
              { id: string | null, title: string, urlPath: string, live: boolean }
              & { __typename: 'CategoryPage' }
            ) | null, type: (
              { id: string, identifier: string, hideCategoryIdentifiers: boolean }
              & { __typename: 'CategoryType' }
            ), attributes: Array<(
              { id: string, key: string }
              & { __typename: 'AttributeCategoryChoice' | 'AttributeChoice' | 'AttributeNumericValue' }
            ) | (
              { value: string, id: string, key: string }
              & { __typename: 'AttributeRichText' | 'AttributeText' }
            )> }
            & { __typename: 'Category' }
          ) | null }
          & { __typename: 'Category' }
        )> }
        & { __typename: 'AttributeCategoryChoice' }
      ) | (
        { text: string | null, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ), choice: (
          { id: string, identifier: string, name: string }
          & { __typename: 'AttributeTypeChoiceOption' }
        ) | null }
        & { __typename: 'AttributeChoice' }
      ) | (
        { id: string, numericValue: number, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeNumericValue' }
      ) | (
        { value: string, id: string, type: (
          { id: string, identifier: string, name: string, format: AttributeTypeFormat, helpText: string, showChoiceNames: boolean, hasZeroOption: boolean, unit: (
            { id: string, name: string, shortName: string | null }
            & { __typename: 'Unit' }
          ) | null, choiceOptions: Array<(
            { id: string, identifier: string, name: string }
            & { __typename: 'AttributeTypeChoiceOption' }
          )> }
          & { __typename: 'AttributeType' }
        ) }
        & { __typename: 'AttributeRichText' | 'AttributeText' }
      )> }
      & { __typename: 'Pledge' }
    ) | null }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type PledgeFeatureEnabledQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
}>;


export type PledgeFeatureEnabledQuery = (
  { plan: (
    { id: string, features: (
      { enableCommunityEngagement: boolean }
      & { __typename: 'PlanFeatures' }
    ) }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type StorybookIndicatorExplorerQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
}>;


export type StorybookIndicatorExplorerQuery = (
  { plan: (
    { id: string, name: string, themeIdentifier: string | null, viewUrl: string | null, organization: (
      { id: string, name: string }
      & { __typename: 'Organization' }
    ) }
    & { __typename: 'Plan' }
  ) | null, planIndicators: Array<(
    { id: string, name: string, level: string | null, timeResolution: IndicatorTimeResolution, description: string | null, minValue: number | null, maxValue: number | null, ticksCount: number | null, ticksRounding: number | null, valueRounding: number | null, desiredTrend: IndicatorDesiredTrend | null, showTrendline: boolean, showTotalLine: boolean, dataCategoriesAreStackable: boolean, nonQuantifiedGoal: IndicatorNonQuantifiedGoal | null, nonQuantifiedGoalDate: string | null, unit: (
      { id: string, name: string, shortName: string | null }
      & { __typename: 'Unit' }
    ), latestValue: (
      { id: string, date: string | null, value: number }
      & { __typename: 'IndicatorValue' }
    ) | null, values: Array<(
      { id: string, value: number, date: string | null, categories: Array<(
        { id: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'IndicatorValue' }
    )>, goals: Array<(
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, quantity: (
      { id: string, name: string }
      & { __typename: 'Quantity' }
    ) | null, referenceValue: (
      { id: string, value: number, date: string | null }
      & { __typename: 'IndicatorValue' }
    ) | null, defaultVisualization: (
      { dimension: (
        { id: string, name: string }
        & { __typename: 'Dimension' }
      ) | null }
      & { __typename: 'IndicatorDefaultAreaChart' | 'IndicatorDefaultLineChart' }
    ) | (
      { barType: string | null, dimension: (
        { id: string, name: string }
        & { __typename: 'Dimension' }
      ) | null }
      & { __typename: 'IndicatorDefaultBarChart' }
    ) | (
      { year: number | null, dimension: (
        { id: string, name: string }
        & { __typename: 'Dimension' }
      ) | null }
      & { __typename: 'IndicatorDefaultPieChart' }
    ) | { __typename: 'IndicatorDefaultSummary' } | null, dimensions: Array<(
      { id: string, dimension: (
        { id: string, name: string, categories: Array<(
          { id: string, name: string, defaultColor: string }
          & { __typename: 'DimensionCategory' }
        )> }
        & { __typename: 'Dimension' }
      ) }
      & { __typename: 'IndicatorDimension' }
    )> }
    & { __typename: 'Indicator' }
  )> | null }
  & { __typename: 'Query' }
);

export type TestPlanLocaleQueryVariables = Exact<{ [key: string]: never; }>;


export type TestPlanLocaleQuery = (
  { plan: (
    { id: string }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type TestPlanInstanceAndLocaleQueryVariables = Exact<{ [key: string]: never; }>;


export type TestPlanInstanceAndLocaleQuery = (
  { plan: (
    { id: string }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type IndicatorSparklineGraphDataQueryVariables = Exact<{
  id: InputMaybe<Scalars['ID']['input']>;
  plan: InputMaybe<Scalars['ID']['input']>;
}>;


export type IndicatorSparklineGraphDataQuery = (
  { plan: (
    { id: string, scenarios: Array<(
      { id: string, identifier: string, name: string }
      & { __typename: 'Scenario' }
    )> }
    & { __typename: 'Plan' }
  ) | null, indicator: (
    { id: string, name: string, timeResolution: IndicatorTimeResolution, showTrendline: boolean, desiredTrend: IndicatorDesiredTrend | null, nonQuantifiedGoal: IndicatorNonQuantifiedGoal | null, nonQuantifiedGoalDate: string | null, reference: string | null, minValue: number | null, maxValue: number | null, referenceValue: (
      { id: string, date: string | null, value: number }
      & { __typename: 'IndicatorValue' }
    ) | null, organization: (
      { id: string, name: string, abbreviation: string | null }
      & { __typename: 'Organization' }
    ), quantity: (
      { id: string, name: string }
      & { __typename: 'Quantity' }
    ) | null, values: Array<(
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )>, categories: Array<(
        { id: string }
        & { __typename: 'DimensionCategory' }
      )> }
      & { __typename: 'IndicatorValue' }
    )>, dimensions: Array<(
      { id: string, dimension: (
        { id: string, name: string, categories: Array<(
          { id: string, name: string }
          & { __typename: 'DimensionCategory' }
        )> }
        & { __typename: 'Dimension' }
      ) }
      & { __typename: 'IndicatorDimension' }
    )>, goals: Array<(
      { id: string, date: string | null, value: number, normalizedValues: Array<(
        { normalizerId: string | null, value: number | null }
        & { __typename: 'NormalizedValue' }
      )>, scenario: (
        { id: string }
        & { __typename: 'Scenario' }
      ) | null }
      & { __typename: 'IndicatorGoal' }
    ) | null> | null, unit: (
      { id: string, name: string, shortName: string | null, verboseName: string | null, verboseNamePlural: string | null }
      & { __typename: 'Unit' }
    ), common: (
      { id: string, name: string, normalizations: Array<(
        { unit: (
          { id: string, shortName: string | null }
          & { __typename: 'Unit' }
        ), normalizer: (
          { name: string, id: string, identifier: string | null }
          & { __typename: 'CommonIndicator' }
        ) }
        & { __typename: 'CommonIndicatorNormalization' }
      )>, indicators: Array<(
        { id: string, timeResolution: IndicatorTimeResolution, minValue: number | null, maxValue: number | null, organization: (
          { id: string, name: string, abbreviation: string | null }
          & { __typename: 'Organization' }
        ), quantity: (
          { id: string, name: string }
          & { __typename: 'Quantity' }
        ) | null, values: Array<(
          { id: string, date: string | null, value: number, normalizedValues: Array<(
            { normalizerId: string | null, value: number | null }
            & { __typename: 'NormalizedValue' }
          )>, categories: Array<(
            { id: string }
            & { __typename: 'DimensionCategory' }
          )> }
          & { __typename: 'IndicatorValue' }
        )>, dimensions: Array<(
          { id: string, dimension: (
            { id: string, name: string, categories: Array<(
              { id: string, name: string }
              & { __typename: 'DimensionCategory' }
            )> }
            & { __typename: 'Dimension' }
          ) }
          & { __typename: 'IndicatorDimension' }
        )>, goals: Array<(
          { id: string, date: string | null, value: number, normalizedValues: Array<(
            { normalizerId: string | null, value: number | null }
            & { __typename: 'NormalizedValue' }
          )>, scenario: (
            { id: string }
            & { __typename: 'Scenario' }
          ) | null }
          & { __typename: 'IndicatorGoal' }
        ) | null> | null, unit: (
          { id: string, name: string, shortName: string | null, verboseName: string | null, verboseNamePlural: string | null }
          & { __typename: 'Unit' }
        ) }
        & { __typename: 'Indicator' }
      )> }
      & { __typename: 'CommonIndicator' }
    ) | null }
    & { __typename: 'Indicator' }
  ) | null }
  & { __typename: 'Query' }
);

export type SitemapQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  hostname: InputMaybe<Scalars['String']['input']>;
}>;


export type SitemapQuery = (
  { planIndicators: Array<(
    { id: string }
    & { __typename: 'Indicator' }
  )> | null, plan: (
    { id: string, primaryLanguage: string, otherLanguages: Array<string>, domain: (
      { id: string, hostname: string, basePath: string | null }
      & { __typename: 'PlanDomain' }
    ) | null, features: (
      { hideFromSearchEngines: boolean }
      & { __typename: 'PlanFeatures' }
    ), actions: Array<(
      { id: string, identifier: string }
      & { __typename: 'Action' }
    )>, pages: Array<(
      { id: string | null, urlPath: string }
      & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
    )> | null }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type { DimensionalNodeMetricFragment } from './paths/graphql';
export { ScenarioKind } from './paths/graphql';