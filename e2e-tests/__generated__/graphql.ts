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
  Tactical = 'TACTICAL'
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

/** An enumeration. */
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

/** PlanFeatures(id, latest_revision, plan, allow_images_for_actions, show_admin_link, allow_public_site_login, expose_unpublished_plan_only_to_authenticated_user, contact_persons_public_data, contact_persons_show_picture, contact_persons_show_organization_ancestors, contact_persons_hide_moderators, has_action_identifiers, show_action_identifiers, has_action_contact_person_roles, minimal_statuses, has_action_official_name, has_action_lead_paragraph, has_action_primary_orgs, enable_search, enable_indicator_comparison, enable_indicator_factors, indicator_ordering, moderation_workflow, display_field_visibility_restrictions, output_report_action_print_layout, password_protected, indicators_open_in_modal, enable_change_log, enable_community_engagement, enable_action_pdf_export_in_public_ui, admin_accessibility_conformance_level) */
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

export type PlaywrightGetPlanBasicsQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
}>;


export type PlaywrightGetPlanBasicsQuery = (
  { plan: (
    { id: string, identifier: string, primaryLanguage: string, otherLanguages: Array<string> }
    & { __typename: 'Plan' }
  ) | null }
  & { __typename: 'Query' }
);

export type PlaywrightGetPlanInfoQueryVariables = Exact<{
  plan: Scalars['ID']['input'];
  locale: Scalars['String']['input'];
  clientURL: Scalars['String']['input'];
}>;


export type PlaywrightGetPlanInfoQuery = (
  { planOrganizations: Array<(
    { id: string, name: string }
    & { __typename: 'Organization' }
  )> | null, plan: (
    { id: string, identifier: string, name: string, shortName: string | null, primaryLanguage: string, otherLanguages: Array<string>, parent: (
      { identifier: string, name: string }
      & { __typename: 'Plan' }
    ) | null, generalContent: (
      { id: string, siteTitle: string, siteDescription: string }
      & { __typename: 'SiteGeneralContent' }
    ), actionListPage: (
      { urlPath: string, includeRelatedPlans: boolean | null }
      & { __typename: 'ActionListPage' }
    ) | null, actions: Array<(
      { identifier: string, viewUrl: string }
      & { __typename: 'Action' }
    )>, mainMenu: (
      { items: Array<(
        { linkText: string, url: string }
        & { __typename: 'ExternalLinkMenuItem' }
      ) | (
        { page: (
          { id: string | null, title: string, urlPath: string, slug: string, showInMenus: boolean, live: boolean }
          & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
        ), parent: (
          { id: string, page: (
            { title: string, showInMenus: boolean, live: boolean }
            & { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' }
          ) }
          & { __typename: 'PageMenuItem' }
        ) | null, children: Array<(
          { id: string, page: { __typename: 'AccessibilityStatementPage' | 'ActionListPage' | 'CategoryPage' | 'CategoryTypePage' | 'EmptyPage' | 'ImpactGroupPage' | 'IndicatorListPage' | 'Page' | 'PlanRootPage' | 'PledgeListPage' | 'PrivacyPolicyPage' | 'StaticPage' } }
          & { __typename: 'PageMenuItem' }
        )> | null }
        & { __typename: 'PageMenuItem' }
      )> }
      & { __typename: 'MainMenu' }
    ) | null }
    & { __typename: 'Plan' }
  ) | null, planIndicators: Array<(
    { id: string, name: string }
    & { __typename: 'Indicator' }
  )> | null, relatedPlanActions: Array<(
    { identifier: string, viewUrl: string }
    & { __typename: 'Action' }
  )> | null }
  & { __typename: 'Query' }
);
