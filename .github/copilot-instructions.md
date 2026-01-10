# DevKnowHow - AI Coding Assistant Instructions

## Project Overview
DevKnowHow is an Angular 18 knowledge base application for managing development commands and routines. It features a REST API backend, internationalization (English/German), and a responsive UI built with Tailwind CSS.

## Architecture
- **Frontend**: Angular 18 with standalone components, reactive forms, and RxJS
- **Backend**: REST API (Django assumed from endpoints)
- **Styling**: Tailwind CSS with custom color palette
- **i18n**: ngx-translate with custom loader from `/assets/i18n/`
- **State Management**: Services with BehaviorSubject observables

### Key Components
- `src/app/base/`: Main feature components (main, category, create, navbar, footer)
- `src/app/services/`: Data, REST, navigation, translation, alert, error handling
- `src/app/interfaces/`: TypeScript interfaces for API models
- `src/app/pipes/`: Custom pipes for text formatting (`*variables*`, `^flags^`)

## Development Patterns

### Component Structure
Use standalone components with explicit imports:
```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
  animations: [fadeIn]
})
```

### Reactive Forms
Create typed form models in `interfaces/create.interface.ts`:
```typescript
export interface CreateFormCommandModel {
  name: FormControl<string | null>;
  body: FormGroup<{ command: FormControl<string | null> }>;
}
```

### Service Patterns
Use BehaviorSubject for reactive state:
```typescript
private categoriesSubject = new BehaviorSubject<Category[]>([]);
categories$ = this.categoriesSubject.asObservable();
```

### HTTP Communication
All API calls include `Accept-Language` header via interceptor. Use `RestService` for backend communication.

### Text Formatting
- `*variable*` → highlighted green (VariablePipe)
- `^flag^` → highlighted accent (FlagPipe)
- Use `DOMPurify.sanitize()` for user content

### Navigation
Hash-based routing with `NavigationService` managing active page/layout/language state in localStorage.

## Development Workflow

### Local Development
```bash
npm start  # ng serve --open
npm run build  # ng build --configuration production
npm test  # ng test
```

### Environment Configuration
- Dev: `http://127.0.0.1:8000/` (environment.ts)
- Prod: `https://server-timvoigt.ch/` (environment.prod.ts)

### Docker Deployment
```bash
docker build -t devknowhow .
docker run -p 80:80 devknowhow
```

## Conventions

### File Organization
- Services: `src/app/services/`
- Interfaces: `src/app/interfaces/`
- Pipes: `src/app/pipes/`
- Utils: `src/app/utils/`
- Assets: `src/assets/` (i18n, fonts, icons, SCSS)

### Naming
- Components: PascalCase with `app-` prefix
- Services: PascalCase with `Service` suffix
- Interfaces: PascalCase with type suffix (e.g., `CategoryDetail`)

### Error Handling
Use `ErrorService.handleHttpError()` with status-specific handlers. Errors display translated alerts via `AlertService`.

### Animations
Import from `@utils/animations` (fadeIn, fadeInSlow, etc.)

### Path Mapping
Use `@services/`, `@interfaces/`, `@pipes/`, `@utils/` for clean imports.

## Key Files
- `src/app/app.config.ts`: Application configuration with providers
- `src/app/app.routes.ts`: Route definitions
- `src/app/services/rest.service.ts`: API communication
- `src/app/services/navigation.service.ts`: App state management
- `src/assets/i18n/en.json`: Translation keys</content>
<parameter name="filePath">c:\Users\landv\Desktop\Code Red\DevKnowHow\.github\copilot-instructions.md