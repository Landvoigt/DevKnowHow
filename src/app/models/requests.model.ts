export class CommandRequest {
    command: string | undefined;
    description: string | undefined;
    category: string | undefined;
    sub_category: string | undefined;
    example: string | undefined;
    tooltip: string | undefined;
    creator_name: string | undefined;
    creator_email: string | undefined;
    creator_message: string | undefined;
}

export class RoutineRequest {
    title: string | undefined;
    routine: string | undefined;
    category: string | undefined;
    sub_category: string | undefined;
    example: string | undefined;
    tooltip: string | undefined;
    creator_name: string | undefined;
    creator_email: string | undefined;
    creator_message: string | undefined;
}


// export const data: Command[] = [
//     // Both
//     new Command("general", null, "cd *path*", "change directory to *path*", "", null, ""),
//     new Command("general", null, "cd ..", "change directory up", "", null, ""),
//     new Command("general", null, "dir", "show directories", "", null, ""),
//     new Command("general", null, "mkdir", "make directory *name*", "", null, ""),
//     new Command("general", null, "rmdir", "remove directory *name*", "", null, ""),
//     new Command("general", null, "rm -r", "remove directory with files inside", "", null, ""),
//     new Command("general", null, "mv *name* *path*", "move file *name* to *path*", "", null, ""),

//     // Windows
//     new Command("cmd", null, "winget install", "clear console", "", null, ""),
//     new Command("cmd", null, "cls", "install program with package manager", "", null, ""),
//     new Command("cmd", null, "ipconfig", "show ip/connection information", "", null, ""),
//     new Command("cmd", null, "netstat -n", "show current open connections", "", null, ""),
//     new Command("cmd", null, "ssh *ip*", "connect to *ip*", "", null, ""),
//     new Command("cmd", null, "wget *ipAdress*", "download file from *ipAdress*, -b to download in background", "", "sudo", ""),
//     new Command("cmd", null, "alias *shortcutName*='*path*'", "create shortcut *shortcutName* to *path*", "", null, ""),

//     // Linux
//     new Command("bash", null, "bash", "open linux console", "", null, ""),
//     new Command("bash", null, "exit", "leave linux console", "", null, ""),
//     new Command("bash", null, "clear", "clear console", "", null, ""),
//     new Command("bash", null, "whoami", "show username", "", null, ""),
//     new Command("bash", null, "pwd", "show current location", "", null, ""),
//     new Command("bash", null, "ls -lr", "show detailed directories", "", null, ""),
//     new Command("bash", null, "ls -la", "show all detailed directories, hidden included", "", null, ""),
//     new Command("bash", null, "lsof", "show list of all processes running, [-u] to only show user processes", "", "sudo", ""),
//     new Command("bash", null, "kill *process*", "close *process*", "", "sudo", ""),
//     new Command("bash", null, "|", "pipe to seperate commands", "", null, ""),
//     new Command("bash", null, "> *name*", "save something in file *name*", "", null, ""),
//     new Command("bash", null, "grep *name*", "filter file *name*", "", null, ""),
//     new Command("bash", null, "cat *name*", "show file *name*", "", null, ""),
//     new Command("bash", null, "cat *name1* *name2* *name3*", "concat files together", "", null, ""),
//     new Command("bash", null, "apt-get install", "install program with package manager, multiple programs behind each other possible", "", "sudo", ""),
//     new Command("bash", null, "apt-get update", "update package manager", "", "sudo", ""),
//     new Command("bash", null, "touch *name*", "create file *name*", "", "sudo", ""),
//     new Command("bash", null, "less *name*", "show file *name*", "", null, ""),
//     new Command("bash", null, "nano *name*", "edit file *name*", "", "sudo", ""),
//     new Command("bash", null, "./*name*", "run program/file *name*", "", "sudo", ""),
//     new Command("bash", null, "python3 *name*", "run program *name* with python3", "", "sudo", ""),
//     new Command("bash", null, "chmod *number* *name*", "change permission to *number* of file *name*", "", "sudo", ""),
//     new Command("bash", null, "ifconfig", "show ip/connection information", "", null, ""),
//     new Command("bash", null, "ssh-keygen -A", "generate shh key", "", "sudo", ""),
//     new Command("bash", null, "service shh start/stop/status", "run/stop/status ssh", "", "sudo", ""),

//     // sed:	(edit texts/files/words)
//     new Command("bash", null, "sed -i 's/*word*/*newWord*/g*' *name*", "change *word* to *newWord* in file *name*, g for all -> number possible instead", "", "sudo", ""),

//     // awk:	(interact with tables/log files)
//     new Command("bash", null, "cat *tableFileName* | awk '*print $*number**'", "show only *number* column of table *tableFileName*, NF instead of number to show last existing entry of column", "", null, ""),

//     // curl:   (test connections/apis)
//     new Command("bash", null, "curl *ipAdress*", "test connection of *ipAdress*", "", null, ""),
//     new Command("bash", null, "curl -i *ipAdress*", "get/test connection details of *ipAdress*", "", null, ""),
//     new Command("bash", null, "curl -d '*variable*' *ipAdress*", "post request with *variable*", "", null, ""),
//     new Command("bash", null, "curl -X *POST/PUT/DELETE* *ipAdress*", "run other CRUD tests", "", null, ""),
//     new Command("bash", null, "curl -u *userVariables* *ipAdress*", "test login", "", null, ""),
//     new Command("bash", null, "curl -o *name* *ipAdress*", "download/save file from *ipAdress* give *name*", "", "sudo", ""),

//     // head/tail: (show only specific number of lines in file from head or tail)
//     new Command("bash", null, "tail -*number* *name*", "show last *number* lines", "", null, ""),
//     new Command("bash", null, "tail -f *name*", "following *number* lines until exit", "", null, ""),

//     // Python / Django
//     new Command("bash", null, "python -m venv env", "create python environment", "", null, ""),
//     new Command("bash", null, "django-admin startapp *name*", "create new django project *name*", "", null, ""),
//     new Command("bash", "manage.py", "python manage.py makemigrations", "create migrations", "", null, ""),
//     new Command("bash", "manage.py", "python manage.py migrate", "migrate database", "", null, ""),
//     new Command("bash", "manage.py", "python manage.py createsuperuser", "create admin", "", null, ""),
//     new Command("bash", "manage.py", "python manage.py runserver", "run server", "", null, ""),
//     new Command("bash", null, "source env/bin/activate", "activate environment in Linux", "", null, ""),

//     // Gunicorn
//     new Command("bash", null, "gunicorn *mainAppName*.wsgi:application --bind 127.0.0.1:8000 --workers *amount*", "locate to your projects main folder, add your *mainAppName*, starts production server with *amount* workers, calculate your processor cores * 2 + 1", "gunicorn videoflix.wsgi:application --bind 127.0.0.1:8000 --workers 3", null, ""),

//     // SQL
//     new Command("sql", null, "SELECT *columnName/columnNameList/** FROM *tableName*", "...", "", null, ""),
//     new Command("sql", null, "ORDER BY *columnName* *format*", "...", "", null, ""),
//     new Command("sql", null, "INSERT INTO *tableName* (*columnName1*, *columnName2*, *columnName3*) VALUES ('*value1*', '*value2*', '*value3*')", "...", "", null, ""),
//     new Command("sql", null, "WHERE *columnName*='*value*'", "...", "", null, ""),
//     new Command("sql", null, "WHERE *columnName* IN ('*value1*', '*value2*')", "...", "", null, ""),
//     new Command("sql", null, "WHERE *columnName1* LIKE '*valueStart*%' AND *columnName2*='*value*'", "...", "", null, ""),
//     new Command("sql", null, "SELECT * FROM *tableName1* LEFT JOIN *tableName2* ON *tableName1*.*linkColumnNameTable1* = *tableName2*.*linkColumnNameTable2* WHERE *columnName*=*value*", "...", "", null, ""),
//     new Command("sql", null, "CREATE TABLE *name*", "...", "", null, ""),
//     new Command("sql", null, "CREATE TABLE *name* AS ...", "...", "", null, ""),
//     new Command("sql", null, "SELECT *columnName1* +/-/*/% *colunName2* AS *newColumnName* FROM *tableName*", "...", "", null, ""),
//     new Command("sql", null, "SELECT SUM/AVG(*columName1* +/-/*/% *columnName2*) AS *newColumnName*, COUNT(*columName1* +/-/*/% *columnName2*) AS *newColumnName* FROM *tableName*", "...", "", null, ""),
//     new Command("sql", null, "DROP TABLE *name*", "...", "", null, ""),
//     new Command("sql", null, "UPDATE *tableName* SET *columnName1*='*newValue*' WHERE *columnName2*='*value*'", "...", "", null, ""),
//     new Command("sql", null, "ALTER TABLE *columnName* ADD COLUMN *newColumnName* *dataType(length)*", "...", "", null, ""),

//     // Redis
//     new Command("bash", null, "tasklist /FI 'IMAGENAME eq redis-server.exe'", "list redis tasks", "", null, ""),
//     new Command("bash", null, "taskkill /PID *taskId* /F", "kill task *taskId*", "", null, ""),
// ];




// Tomcat
// - go to opt/anvaris/
// - exchange anvaris.war
// - systemctl restart tomcat (restart tomcat server)
// - systemctl status tomcat (tomcat status)  -->

// <!-- Docker

// - cd docker/ (locate to docker folder)
// - docker build --tag *container*:*version* --file ./dockerconfig/*dockerfile* .
//     xmpl: docker build --tag anvaris:1.0 --file ./dockerconfig/Dockerfile_tomcat .
//     xmpl: docker build --tag database --file ./dockerconfig/Dockerfile_db .
//     (build docker image, to be done multiple times for each container, :*version* not neccessary) - docker image list (see all images/versions)
// - docker volume create dbdata (create db connection)
// - vim compose.yaml (check correct images, update version)
// - systemctl disable --now *service* (close running *service*, disable autostart)
//     xmpl: systemctl disable --now tomcat
//     xmpl: systemctl disable --now postgresql-12
//     xmpl: systemctl disable --now postfix
// - docker compose up -d (create docker environment)
// - docker logs --follow *container* (get logs from the running container/app)
//     xmpl: docker logs --follow anvaris
// - docker exec -it *containerId* bash (go into *containerId* bash)
// - docker rmi *imageId* -f (remove image with *imageId* force)
// - docker ps -a (show all containers, including unused)

// Portainer

// - go to environments
// - click add environment
// - select docker standalone
// - click start wizard
// - copy

// command for server os

// - run command on server
// - enter name and environment address
// - click connect
// - docker run -d \ -p 8000:8000 \ -p 9443:9443 \ --name=portainer \ --restart=always \ -v
//     /var/run/docker.sock:/var/run/docker.sock \ -v ~/docker/portainer:/data \ portainer/portainer-ce:latest \ --ssl \
//     --sslcert /certs/ssl.crt \ --sslkey /certs/ssl.key (add certificate portainer NOT WORKING atm)
// - docker run -d \ -p 9001:9001 \ --name portainer_agent \ --restart=always \ -v /var/run/docker.sock:/var/run/docker.sock \ -v
//     /var/lib/docker/volumes:/var/lib/docker/volumes \ portainer/agent:latest (add environment to portainer console)

// data-transfer between servers (mobaxterm)

// - scp -r ./*dir* root@*ip*:/root/ (copy *dir* to root of server *ip*)
//     xmpl: scp -r ./docker root@192.168.2.89:/root/ SystemCTL
// - systemctl status *name** (search anything with *name* inside)
// - systemctl start docker (maybe needed to enable docker)

// MSQL

// - EXEC sp_rename 'dbo.os_outsourcing.optimisation', 'optimization', 'COLUMN'; (change column name)
// - ALTER TABLE dbo.us_user ADD country VARCHAR(255); (add column)
// - UPDATE dbo.us_role SET description = comment; (copy data to another column)

// PSQL

// - ALTER TABLE us_user ADD COLUMN building VARCHAR(255); (add column) INSERT INTO us_user_settings (user_id,
//     version, data, status, active, start_date, end_date, createdBy, updatedBy) SELECT id AS user_id, 0, NULL, NULL,
//     true, start_date, end_date, createdBy, updatedBy FROM us_user; UPDATE u SET u.settings = s.id
//     FROM us_user u JOIN us_user_settings s ON s.createdBy = u.createdBy; UPDATE ara_asset (alle Einträge aus Tabelle bei
//     Column eintragen) SET type = 'Application' WHERE ---Bedingung---;

// Other

// - history | less (show last commands used)
// - sed -i 's/old-text/new-text/' server.xml (change words/lines in file)

// ngStyle: [ngStyle]="*'margin-right': enableSettings ? '-5.125rem' : '-7rem'*"

// ngClass: [ngClass]="*'accordion-not-collapsed': !merInfoCollapsed*" [ngClass]="*'submit-btn-danger': primaryBtnName ===
//     'Delete', 'submit-btn-default': primaryBtnName === 'Exit', 'submit-btn-colored': primaryBtnName !== 'Delete' &&
//     primaryBtnName !== 'Exit'*"

// scss if else: @mixin progressConnector($root, $st, $nd, $rd, $end) * margin-top: 1px;
//     @if $root == $st * margin-bottom: $end; * @else if $root == $nd * margin-bottom: $end; * @else if $root == $rd *
//     margin-bottom: $end; * * .sd-progress-buttons__connector  background-color: rgb(var(--root-accent-color))
//     !important; bottom: calc(1.68*(var(--sjs-base-unit, var(--base-unit, .65rem)))) !important; @include
//     progressConnector(var(--root-font-size), 12px, 14px, 16px, 0);


// import { ValidatorFn, AsyncValidatorFn } from '@angular/forms'; import { Dictionary, DictionaryUtils } from '../dictionary/dictionary'; import { EntitySearchCriteria, EntitySortCriteria } from '../entity/entity'; export class EntityMetaDataUtils {
//     static getEntityLink(id: any, metadata: EntityMetaData<any>): string { if (!id) return null; if (!metadata) return '' + id; if (id.length > 12) return metadata.uiPath + id; return metadata.uiPath + (this.getEnrichedId(id, metadata)); } static getEnrichedId(id: number, metadata: EntityMetaData<any>): string { if (!id) return null; if (!metadata) return '' + id; const longID = (1000000000000 + id).toString(); return metadata.entityPrefix + longID.substring(longID.length - 12); }
//     static getFieldMetaData(name: string, metadata: EntityMetaData<any>): EntityFieldMetaData { const parts = name.split('.'); if (parts.length > 1) { const fieldMetaData = metadata.fields.find(element => element.name === parts[0]); if (fieldMetaData.type instanceof RefEntityFieldType) { const inlineFieldMetaData = fieldMetaData.type.entityMetaData === 'self' ? metadata : fieldMetaData.type.entityMetaData; const originalFieldMetaData = metadata.fields.find(element => element.name === name); let referenceFieldMetaData = this.getFieldMetaData(name.substring(parts[0].length + 1), inlineFieldMetaData); referenceFieldMetaData.label = originalFieldMetaData.label || referenceFieldMetaData.label; return referenceFieldMetaData; } } return metadata.fields.find(element => element.name === name); }
// } type Constructor<T> = new (...args: any[]) => T;
// export class EntityMetaData<T> {
//     readonly entityCode: string; // Uniq identifier for the entity type across the whole application readonly entityClass : Constructor<T>; // Class representing the enity readonly entityPrefix : string; // Uniq prefix for the entity IDs entityIcon : string; // Icon displayed in link fields behavior : EntityBehavior[]; // Supported behaviors fields : EntityFieldMetaData[]; // Entity attributes uiName : string; // Entity name singular uiNamePlural : string; // Entity name plural uiPath : string; // Path to the entity screen apiPath : string; // Path to the entity server end points useMockData : boolean = false; // Switch to enable / disable mock data mockDataPath : string; // Path to the mock data preSort : EntitySortCriteria[] // Condition how to pre sort table when loading preventDeletionIf : any[] | 'noAdmin'; // Condition when tr
//     enableInDashboard: boolean = false; // Declare if entity is selectable as dashboard tile roles : string[] // Roles that have view permission errors: { // Error messages for the entity and its fields [code: string] : ErrorMetaData; }; public constructor(init?:Partial<EntityMetaData<T>>) { Object.assign(this, init); } public newInstance(): T { return new this.entityClass(); // Creates new instance of T } public caption(entity: any): string { return entity.enrichedId; } public getNormalizedValue(value : any): string { return EntityMetaDataUtils.getEnrichedId(value, this); } public getAllFields() { return this.fields; } public preSave(entity: T): T { // A hook to implement any entity pre save logic return entity; } public preSearch(criteria: EntitySearchCriteria) { // A hook to implement any entity pre save logic } public postLoad(entity: T): T { // A hook to implement any entity post load logic return entity; } }
//     export class PanelMenuItem {
//     text: string; link?: string; action?: string; css?: string; constructor(text: string, actionOrLink?: string, css?: string) {
//         if (text === "divider") { this.action = text; } else { // For non-divider items, css and actionOrLink are required if (!css || !actionOrLink || actionOrLink.trim() === "") { throw new Error("Non-divider items require 'css' and either 'link' or 'action'."); } this.text = text; this.css = css; // Determine if actionOrLink is a link (contains '/') or action (does not contain '/') if (actionOrLink.includes("/")) { this.link = actionOrLink; } else { this.action = actionOrLink; } } } }
//             export class PanelExportMenuItem extends PanelMenuItem { submenuOpen?: boolean | null; constructor(text: string, actionOrLink?: string, css?: string, submenuOpen?: boolean) { super(text, actionOrLink, css); this.submenuOpen = submenuOpen !== undefined ? submenuOpen : null; } } export class PanelActionButton { text: string; action: string; disabled: boolean; css?: string; constructor(text: string, action: string, disabled: boolean, css: string = '') { this.text = text; this.action = action; this.disabled = disabled; this.css = css; } }
//             export abstract class EntityBehavior { readonly id: string = 'abstract'; } export class CrudEntityBehavior extends EntityBehavior { // Enities supporting CRUD bevavior readonly id = 'crudEntity'; apiURLs : { // Api URLs get : string; // Get entity by ID save : string; // Save entity delete : string; // Delete enity by ID }; public constructor(init?:Partial<CrudEntityBehavior>) { super(); Object.assign(this, init); } }
//             export class ReferenceEntityBehavior extends EntityBehavior { // Enities which can act as Reference Data readonly id = 'referenceEntity'; apiURLs : { // Api URLs get : string; // Get entity by ID }; public constructor(init?:Partial<ReferenceEntityBehavior>) { super(); Object.assign(this, init); } } export class DatatableEntityBehavior extends EntityBehavior { // Enities which support Datatables api readonly id = 'datatableEntity'; caption : string; // Title type : DatatableEntityBehaviorType; // Behavior type allFields : DatatableEntityBehaviorField[]; // Table´s all fields standardFields : DatatableEntityBehaviorField[]; // Table's standard fields component : string = 'addEntityRelationComponent'; // Component to show on add deleteOnUnlink : boolean = false; // Whether to delete the underlying lniked entity instance on unlink request apiURLs? : { // Api URLs list : string; // Get entities }; tableActions? : PanelMenuItem[]; public constructor(
//                 export enum DatatableEntityBehaviorType {
//                 list, // Behavior in an entity list relation, // Behavior in a relations list children, // Behavior in a list of children approval // Marks Approval Workflow relation } export class DatatableEntityBehaviorField { name? : string; width? : number; maxWidth? : number; cellRenderer? : string; cellRendererParams? : any; headerCheckboxSelection?: boolean = false; checkboxSelection? : boolean = false; } export class DatatableEntityBehaviorTextField extends DatatableEntityBehaviorField { public constructor(init?:Partial<DatatableEntityBehaviorTextField>) { super(); Object.assign(this, init); } }
//                 export class DatatableEntityBehaviorActionField extends DatatableEntityBehaviorField {
//                 actions ? : { // Suported actions on the row level text : string; link : string; }[]; buttons? : { // Suported action buttons on the row level image? : string; tooltip? : string; link? : string; action? : string; }[]; public constructor(init?:Partial<DatatableEntityBehaviorActionField>) { super(); Object.assign(this, init); } }
//                     export class EntityPreventDeletionCondition { field: string; values: any[]; constructor(field: string, values: any[]) { this.field = field; this.values = values; } matches(data: any): boolean { const fieldValue = data[this.field]; return this.values.some(value => { if (typeof fieldValue === 'string' && typeof value === 'string') { return fieldValue === value || fieldValue.startsWith(value); } if (typeof fieldValue === 'boolean' && typeof value === 'boolean') { return fieldValue === value; } return false; }); } }
//                 export class EntityFieldMetaData {
//                     name: string; type: EntityFieldType; uiType: EntityUIFieldType; description: string; label: string; mouseover: string; tooltip: string; tooltipHeader: string; placeholder: string; cssDiv: string; cssLabel: string; cssField: string; cssHelperText: string; disabled: boolean = false; // visible in tables but disabled in forms required : boolean = false; secret : boolean = false; // not visable anywhere validators : ValidatorFn[]; asyncValidators : AsyncValidatorFn[]; options : any;
//                     errors: { // Error messages for the entity and its fields [code: string] : ErrorMetaData; }; public constructor(init?:Partial<EntityFieldMetaData>) { Object.assign(this, init); } public advancedTooltip(entity: any): string { return entity && this.tooltip ? this.tooltip : ''; } }
//                         export class RefEntityFieldType extends EntityFieldType {
//                     readonly id: string = 'entity'; entityMetaData: EntityMetaData<any> | 'self'; // In case EntityMetaData is static entityMetaDataFn : (value: any) => EntityMetaData<any>; // In case EntityMetaData determined dynamically entityMetaDataCodeFn : (value: any) => string; // In case only entity code can be determined dynamically and EntityMetaData shall be looked up for it entityPreprocessorFn : (value: any) => any; // In case Entity value shall be preprocessed public constructor(init?:Partial<RefEntityFieldType>) { super(); Object.assign(this, init); } getNormalizedValue(value : any): string { if (!value) return ''; if (this.entityMetaData == 'self') return ''; if (this.entityMetaData) return this.entityMetaData.getNormalizedValue(value); if (this.entityMetaDataFn) return this.entityMetaDataFn(value).getNormalizedValue(value); return super.getNormalizedValue(value); } }
//                             RXJS combine Subscriptions onEntityDataLoaded(): void {
//                         const applicableMers$ = this.service.araData.getApplicableMers(this.entity.ara.id).pipe(takeWhile(() => this.iAmAlive)); const jiraIssues$ = this.service.araData.getJiraIssues(this.entity.id).pipe(takeWhile(() => this.iAmAlive)); combineLatest([applicableMers$, jiraIssues$]).subscribe(([mers, issues]) => {
//                             this.allApplicableMers = mers; this.jiraIssues = issues; this.applicableMersLoaded = true; this.jiraIssuesLoaded = true; this.setActionButtons(); // Now both are loaded }); }

//                             import { Directive, ElementRef, HostListener, Input, forwardRef } from '@angular/core'; import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'; const DOMPurify = require('dompurify'); @Directive({ selector: '[contentEditable]', providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ContentEditableValueAccessor), multi: true, },], }) export class ContentEditableValueAccessor implements ControlValueAccessor { @Input() contentEditable: string; constructor(private el: ElementRef) { }
// // The method that sets and sanitizes the value in the form control writeValue(value: any): void { if (value === undefined || value === null) { this.el.nativeElement.innerHTML = ''; } else { this.el.nativeElement.innerHTML = DOMPurify.sanitize(value); } } // The method that registers the onChange callback to update the value in the form control registerOnChange(fn: any): void { this.onChange = fn; } // The method that registers the onTouched callback registerOnTouched(fn: any): void { this.onTouched = fn; } // Triggered when the content of the element changes @HostListener('input', ['$event']) onInput(event: Event): void { const sanitizedContent = DOMPurify.sanitize(this.el.nativeElement.innerHTML); this.onChange(sanitizedContent); } // Called when the element is blurred (loses focus) @HostListener('blur', ['$event']) onBlur(event: Event): void { this.onTouched(); } // The onChange function that will be called when the value changes private onChange = (value: any) => { }; // The onTouched function that will be called when the field is blurred private onTouched = () => { }; }
