import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext
import json
import os
from datetime import datetime

class ProjectManager:
    def __init__(self, root):
        self.root = root
        self.root.title("Data Science Portfolio - Project Manager")
        self.root.geometry("1200x800")
        
        # File path (same directory)
        self.json_file = "projects.json"
        
        # Load data
        self.data = self.load_json()
        self.current_project = None
        self.current_category = None
        
        # Create UI with tabs
        self.create_ui()
        self.load_projects_list()
        self.load_categories_list()
        
    def load_json(self):
        """Load projects from JSON file"""
        try:
            with open(self.json_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            messagebox.showerror("Error", f"Could not find {self.json_file}")
            return {"projects": [], "categories": []}
        except json.JSONDecodeError:
            messagebox.showerror("Error", "Invalid JSON file")
            return {"projects": [], "categories": []}
    
    def save_json(self):
        """Save projects to JSON file"""
        try:
            with open(self.json_file, 'w', encoding='utf-8') as f:
                json.dump(self.data, f, indent=2, ensure_ascii=False)
            messagebox.showinfo("Success", "Data saved successfully!")
            return True
        except Exception as e:
            messagebox.showerror("Error", f"Could not save file: {str(e)}")
            return False
    
    def create_ui(self):
        """Create the user interface with tabs"""
        # Create notebook (tabs)
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Projects tab
        projects_tab = ttk.Frame(self.notebook)
        self.notebook.add(projects_tab, text="Projects")
        self.create_projects_tab(projects_tab)
        
        # Categories tab
        categories_tab = ttk.Frame(self.notebook)
        self.notebook.add(categories_tab, text="Categories")
        self.create_categories_tab(categories_tab)
    
    def create_projects_tab(self, parent):
        """Create the projects management tab"""
        # Main container
        main_container = ttk.Frame(parent, padding="10")
        main_container.pack(fill=tk.BOTH, expand=True)
        
        # Configure grid weights
        main_container.columnconfigure(1, weight=1)
        main_container.rowconfigure(0, weight=1)
        
        # Left panel - Projects list
        left_panel = ttk.Frame(main_container, padding="5")
        left_panel.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        ttk.Label(left_panel, text="Projects", font=('Arial', 14, 'bold')).pack(pady=5)
        
        # Projects listbox with scrollbar
        list_frame = ttk.Frame(left_panel)
        list_frame.pack(fill=tk.BOTH, expand=True, pady=5)
        
        scrollbar = ttk.Scrollbar(list_frame)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        self.projects_listbox = tk.Listbox(list_frame, yscrollcommand=scrollbar.set, width=40)
        self.projects_listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.config(command=self.projects_listbox.yview)
        
        self.projects_listbox.bind('<<ListboxSelect>>', self.on_project_select)
        
        # Buttons
        btn_frame = ttk.Frame(left_panel)
        btn_frame.pack(fill=tk.X, pady=5)
        
        ttk.Button(btn_frame, text="New Project", command=self.new_project).pack(fill=tk.X, pady=2)
        ttk.Button(btn_frame, text="Delete Project", command=self.delete_project).pack(fill=tk.X, pady=2)
        
        # Right panel - Project editor
        right_panel = ttk.Frame(main_container, padding="5")
        right_panel.grid(row=0, column=1, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        ttk.Label(right_panel, text="Project Details", font=('Arial', 14, 'bold')).pack(pady=5)
        
        # Scrollable editor frame
        canvas = tk.Canvas(right_panel)
        scrollbar = ttk.Scrollbar(right_panel, orient="vertical", command=canvas.yview)
        self.editor_frame = ttk.Frame(canvas)
        
        self.editor_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
        )
        
        canvas.create_window((0, 0), window=self.editor_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)
        
        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        
        self.create_editor_fields()
        
        # Save button at bottom
        ttk.Button(right_panel, text="Save Project", command=self.save_project).pack(pady=10)
    
    def create_categories_tab(self, parent):
        """Create the categories management tab"""
        # Main container
        main_container = ttk.Frame(parent, padding="10")
        main_container.pack(fill=tk.BOTH, expand=True)
        
        # Configure grid weights
        main_container.columnconfigure(1, weight=1)
        main_container.rowconfigure(0, weight=1)
        
        # Left panel - Categories list
        left_panel = ttk.Frame(main_container, padding="5")
        left_panel.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        ttk.Label(left_panel, text="Categories", font=('Arial', 14, 'bold')).pack(pady=5)
        
        # Categories listbox with scrollbar
        list_frame = ttk.Frame(left_panel)
        list_frame.pack(fill=tk.BOTH, expand=True, pady=5)
        
        scrollbar = ttk.Scrollbar(list_frame)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        self.categories_listbox = tk.Listbox(list_frame, yscrollcommand=scrollbar.set, width=40)
        self.categories_listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.config(command=self.categories_listbox.yview)
        
        self.categories_listbox.bind('<<ListboxSelect>>', self.on_category_select)
        
        # Buttons
        btn_frame = ttk.Frame(left_panel)
        btn_frame.pack(fill=tk.X, pady=5)
        
        ttk.Button(btn_frame, text="New Category", command=self.new_category).pack(fill=tk.X, pady=2)
        ttk.Button(btn_frame, text="Delete Category", command=self.delete_category).pack(fill=tk.X, pady=2)
        
        # Right panel - Category editor
        right_panel = ttk.Frame(main_container, padding="5")
        right_panel.grid(row=0, column=1, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        ttk.Label(right_panel, text="Category Details", font=('Arial', 14, 'bold')).pack(pady=5)
        
        # Category fields
        self.category_fields = {}
        
        fields_frame = ttk.Frame(right_panel)
        fields_frame.pack(fill=tk.BOTH, expand=True, pady=20, padx=20)
        
        # ID field
        ttk.Label(fields_frame, text="ID* (lowercase, no spaces):", font=('Arial', 10, 'bold')).grid(
            row=0, column=0, sticky=tk.W, pady=10, padx=5
        )
        self.category_fields['id'] = ttk.Entry(fields_frame, width=40)
        self.category_fields['id'].grid(row=0, column=1, sticky=(tk.W, tk.E), pady=10, padx=5)
        
        # Name field
        ttk.Label(fields_frame, text="Name* (display name):", font=('Arial', 10, 'bold')).grid(
            row=1, column=0, sticky=tk.W, pady=10, padx=5
        )
        self.category_fields['name'] = ttk.Entry(fields_frame, width=40)
        self.category_fields['name'].grid(row=1, column=1, sticky=(tk.W, tk.E), pady=10, padx=5)
        
        # Usage info
        self.category_usage_label = ttk.Label(fields_frame, text="", foreground="gray")
        self.category_usage_label.grid(row=2, column=0, columnspan=2, sticky=tk.W, pady=10, padx=5)
        
        # Save button
        ttk.Button(right_panel, text="Save Category", command=self.save_category).pack(pady=10)
    
    def create_editor_fields(self):
        """Create input fields for project editing"""
        self.fields = {}
        
        # Basic fields
        basic_fields = [
            ("Title*", "title", "entry"),
            ("Slug* (URL-friendly)", "slug", "entry"),
            ("Description*", "description", "text"),
            ("Category*", "category", "combo"),
            ("Icon", "icon", "combo"),
            ("Icon Color", "iconColor", "entry"),
            ("Date", "date", "entry"),
        ]
        
        row = 0
        for label, key, field_type in basic_fields:
            ttk.Label(self.editor_frame, text=label, font=('Arial', 10, 'bold')).grid(
                row=row, column=0, sticky=tk.W, pady=5, padx=5
            )
            
            if field_type == "entry":
                field = ttk.Entry(self.editor_frame, width=50)
                field.grid(row=row, column=1, sticky=(tk.W, tk.E), pady=5, padx=5)
            elif field_type == "text":
                field = tk.Text(self.editor_frame, width=50, height=3, wrap=tk.WORD)
                field.grid(row=row, column=1, sticky=(tk.W, tk.E), pady=5, padx=5)
            elif field_type == "combo":
                if key == "category":
                    # Get categories dynamically
                    values = [cat['id'] for cat in self.data['categories']]
                elif key == "icon":
                    values = ["LineChart", "Layers", "BrainCircuit", "TrendingUp", "AreaChart", "BarChart3"]
                field = ttk.Combobox(self.editor_frame, width=47, values=values)
                field.grid(row=row, column=1, sticky=(tk.W, tk.E), pady=5, padx=5)
            
            self.fields[key] = field
            row += 1
        
        # Array fields (features, libraries, tags, results, technologies)
        array_fields = [
            ("Features* (one per line)", "features"),
            ("Libraries* (one per line)", "libraries"),
            ("Tags (one per line)", "tags"),
            ("Technologies (one per line)", "technologies"),
        ]
        
        for label, key in array_fields:
            ttk.Label(self.editor_frame, text=label, font=('Arial', 10, 'bold')).grid(
                row=row, column=0, sticky=tk.W, pady=5, padx=5
            )
            field = scrolledtext.ScrolledText(self.editor_frame, width=50, height=5, wrap=tk.WORD)
            field.grid(row=row, column=1, sticky=(tk.W, tk.E), pady=5, padx=5)
            self.fields[key] = field
            row += 1
        
        # Long text fields
        long_fields = [
            ("Summary*", "summary"),
            ("Challenge*", "challenge"),
            ("Solution*", "solution"),
            ("Results* (one per line)", "results"),
        ]
        
        for label, key in long_fields:
            ttk.Label(self.editor_frame, text=label, font=('Arial', 10, 'bold')).grid(
                row=row, column=0, sticky=tk.W, pady=5, padx=5
            )
            field = scrolledtext.ScrolledText(self.editor_frame, width=50, height=5, wrap=tk.WORD)
            field.grid(row=row, column=1, sticky=(tk.W, tk.E), pady=5, padx=5)
            self.fields[key] = field
            row += 1
        
        # URL fields
        url_fields = [
            ("Live URL", "liveUrl"),
            ("GitHub URL", "githubUrl"),
        ]
        
        for label, key in url_fields:
            ttk.Label(self.editor_frame, text=label, font=('Arial', 10, 'bold')).grid(
                row=row, column=0, sticky=tk.W, pady=5, padx=5
            )
            field = ttk.Entry(self.editor_frame, width=50)
            field.grid(row=row, column=1, sticky=(tk.W, tk.E), pady=5, padx=5)
            self.fields[key] = field
            row += 1
    
    def update_category_dropdown(self):
        """Update the category dropdown with current categories"""
        values = [cat['id'] for cat in self.data['categories']]
        self.fields['category']['values'] = values
    
    def load_projects_list(self):
        """Load all projects into the listbox"""
        self.projects_listbox.delete(0, tk.END)
        for project in self.data['projects']:
            self.projects_listbox.insert(tk.END, project['title'])
    
    def load_categories_list(self):
        """Load all categories into the listbox"""
        self.categories_listbox.delete(0, tk.END)
        for category in self.data['categories']:
            self.categories_listbox.insert(tk.END, f"{category['name']} ({category['id']})")
    
    def on_project_select(self, event):
        """Handle project selection from list"""
        selection = self.projects_listbox.curselection()
        if selection:
            index = selection[0]
            self.current_project = self.data['projects'][index]
            self.load_project_data()
    
    def on_category_select(self, event):
        """Handle category selection from list"""
        selection = self.categories_listbox.curselection()
        if selection:
            index = selection[0]
            self.current_category = self.data['categories'][index]
            self.load_category_data()
    
    def load_project_data(self):
        """Load selected project data into editor fields"""
        if not self.current_project:
            return
        
        # Load simple fields
        simple_fields = ['title', 'slug', 'category', 'icon', 'iconColor', 'date', 'liveUrl', 'githubUrl']
        for key in simple_fields:
            if key in self.fields and key in self.current_project:
                field = self.fields[key]
                if isinstance(field, ttk.Entry) or isinstance(field, ttk.Combobox):
                    field.delete(0, tk.END)
                    field.insert(0, self.current_project.get(key, ''))
        
        # Load text fields
        text_fields = ['description', 'summary', 'challenge', 'solution']
        for key in text_fields:
            if key in self.fields and key in self.current_project:
                field = self.fields[key]
                if isinstance(field, tk.Text):
                    field.delete('1.0', tk.END)
                    field.insert('1.0', self.current_project.get(key, ''))
                elif isinstance(field, scrolledtext.ScrolledText):
                    field.delete('1.0', tk.END)
                    field.insert('1.0', self.current_project.get(key, ''))
        
        # Load array fields
        array_fields = ['features', 'libraries', 'tags', 'technologies', 'results']
        for key in array_fields:
            if key in self.fields and key in self.current_project:
                field = self.fields[key]
                if isinstance(field, scrolledtext.ScrolledText):
                    field.delete('1.0', tk.END)
                    items = self.current_project.get(key, [])
                    field.insert('1.0', '\n'.join(items))
    
    def load_category_data(self):
        """Load selected category data into editor fields"""
        if not self.current_category:
            return
        
        # Load ID
        self.category_fields['id'].delete(0, tk.END)
        self.category_fields['id'].insert(0, self.current_category.get('id', ''))
        
        # Load Name
        self.category_fields['name'].delete(0, tk.END)
        self.category_fields['name'].insert(0, self.current_category.get('name', ''))
        
        # Show usage count
        cat_id = self.current_category.get('id', '')
        usage_count = sum(1 for p in self.data['projects'] if p.get('category') == cat_id)
        self.category_usage_label.config(text=f"Used by {usage_count} project(s)")
    
    def clear_fields(self):
        """Clear all editor fields"""
        for key, field in self.fields.items():
            if isinstance(field, ttk.Entry) or isinstance(field, ttk.Combobox):
                field.delete(0, tk.END)
            elif isinstance(field, tk.Text) or isinstance(field, scrolledtext.ScrolledText):
                field.delete('1.0', tk.END)
    
    def clear_category_fields(self):
        """Clear category editor fields"""
        for key, field in self.category_fields.items():
            field.delete(0, tk.END)
        self.category_usage_label.config(text="")
    
    def get_field_value(self, key):
        """Get value from a field"""
        field = self.fields[key]
        if isinstance(field, ttk.Entry) or isinstance(field, ttk.Combobox):
            return field.get().strip()
        elif isinstance(field, tk.Text):
            return field.get('1.0', tk.END).strip()
        elif isinstance(field, scrolledtext.ScrolledText):
            return field.get('1.0', tk.END).strip()
        return ""
    
    def new_project(self):
        """Create a new project"""
        self.current_project = None
        self.clear_fields()
        
        # Set defaults
        self.fields['iconColor'].delete(0, tk.END)
        self.fields['iconColor'].insert(0, '#7D9D7F')
        self.fields['date'].delete(0, tk.END)
        self.fields['date'].insert(0, datetime.now().strftime('%B %Y'))
        self.fields['liveUrl'].delete(0, tk.END)
        self.fields['liveUrl'].insert(0, '#')
        self.fields['githubUrl'].delete(0, tk.END)
        self.fields['githubUrl'].insert(0, '#')
        
        messagebox.showinfo("New Project", "Fill in the project details and click 'Save Project'")
    
    def new_category(self):
        """Create a new category"""
        self.current_category = None
        self.clear_category_fields()
        messagebox.showinfo("New Category", "Fill in the category details and click 'Save Category'")
    
    def save_project(self):
        """Save current project"""
        # Validate required fields
        required_fields = ['title', 'slug', 'description', 'category', 'features', 'libraries']
        for key in required_fields:
            value = self.get_field_value(key)
            if not value:
                messagebox.showerror("Error", f"'{key}' is required!")
                return
        
        # Build project object
        project = {
            'title': self.get_field_value('title'),
            'slug': self.get_field_value('slug'),
            'description': self.get_field_value('description'),
            'category': self.get_field_value('category'),
            'icon': self.get_field_value('icon') or 'BarChart3',
            'iconColor': self.get_field_value('iconColor') or '#7D9D7F',
            'date': self.get_field_value('date') or datetime.now().strftime('%B %Y'),
            'liveUrl': self.get_field_value('liveUrl') or '#',
            'githubUrl': self.get_field_value('githubUrl') or '#',
        }
        
        # Add array fields
        array_fields = ['features', 'libraries', 'tags', 'technologies', 'results']
        for key in array_fields:
            value = self.get_field_value(key)
            if value:
                project[key] = [line.strip() for line in value.split('\n') if line.strip()]
            else:
                project[key] = []
        
        # Add long text fields
        text_fields = ['summary', 'challenge', 'solution']
        for key in text_fields:
            project[key] = self.get_field_value(key)
        
        # Add or update project
        if self.current_project:
            # Update existing project
            for i, p in enumerate(self.data['projects']):
                if p.get('slug') == self.current_project.get('slug'):
                    # Keep the same ID
                    project['id'] = p['id']
                    self.data['projects'][i] = project
                    break
        else:
            # New project - assign new ID
            max_id = max([p.get('id', 0) for p in self.data['projects']], default=0)
            project['id'] = max_id + 1
            self.data['projects'].append(project)
        
        # Save to file
        if self.save_json():
            self.current_project = project
            self.load_projects_list()
            
            # Select the saved project in list
            for i, p in enumerate(self.data['projects']):
                if p['slug'] == project['slug']:
                    self.projects_listbox.selection_clear(0, tk.END)
                    self.projects_listbox.selection_set(i)
                    self.projects_listbox.see(i)
                    break
    
    def save_category(self):
        """Save current category"""
        # Get values
        cat_id = self.category_fields['id'].get().strip()
        cat_name = self.category_fields['name'].get().strip()
        
        # Validate
        if not cat_id or not cat_name:
            messagebox.showerror("Error", "Both ID and Name are required!")
            return
        
        # Validate ID format (lowercase, no spaces)
        if ' ' in cat_id or cat_id != cat_id.lower():
            messagebox.showerror("Error", "ID must be lowercase with no spaces!")
            return
        
        # Check for duplicate ID (if new or ID changed)
        if not self.current_category or self.current_category['id'] != cat_id:
            if any(cat['id'] == cat_id for cat in self.data['categories']):
                messagebox.showerror("Error", f"Category ID '{cat_id}' already exists!")
                return
        
        # Build category object
        category = {
            'id': cat_id,
            'name': cat_name
        }
        
        # Add or update category
        if self.current_category:
            # Update existing category
            old_id = self.current_category['id']
            for i, c in enumerate(self.data['categories']):
                if c['id'] == old_id:
                    self.data['categories'][i] = category
                    
                    # Update all projects using this category if ID changed
                    if old_id != cat_id:
                        for project in self.data['projects']:
                            if project.get('category') == old_id:
                                project['category'] = cat_id
                    break
        else:
            # New category
            self.data['categories'].append(category)
        
        # Save to file
        if self.save_json():
            self.current_category = category
            self.load_categories_list()
            self.update_category_dropdown()
            
            # Select the saved category in list
            for i, c in enumerate(self.data['categories']):
                if c['id'] == category['id']:
                    self.categories_listbox.selection_clear(0, tk.END)
                    self.categories_listbox.selection_set(i)
                    self.categories_listbox.see(i)
                    break
    
    def delete_project(self):
        """Delete selected project"""
        selection = self.projects_listbox.curselection()
        if not selection:
            messagebox.showwarning("Warning", "Please select a project to delete")
            return
        
        index = selection[0]
        project = self.data['projects'][index]
        
        if messagebox.askyesno("Confirm Delete", f"Are you sure you want to delete '{project['title']}'?"):
            self.data['projects'].pop(index)
            if self.save_json():
                self.load_projects_list()
                self.clear_fields()
                self.current_project = None
    
    def delete_category(self):
        """Delete selected category"""
        selection = self.categories_listbox.curselection()
        if not selection:
            messagebox.showwarning("Warning", "Please select a category to delete")
            return
        
        index = selection[0]
        category = self.data['categories'][index]
        cat_id = category['id']
        
        # Check if category is in use
        usage_count = sum(1 for p in self.data['projects'] if p.get('category') == cat_id)
        
        if usage_count > 0:
            messagebox.showerror(
                "Cannot Delete", 
                f"Category '{category['name']}' is used by {usage_count} project(s).\n\n"
                "Please reassign those projects to another category before deleting."
            )
            return
        
        if messagebox.askyesno("Confirm Delete", f"Are you sure you want to delete category '{category['name']}'?"):
            self.data['categories'].pop(index)
            if self.save_json():
                self.load_categories_list()
                self.update_category_dropdown()
                self.clear_category_fields()
                self.current_category = None

def main():
    root = tk.Tk()
    app = ProjectManager(root)
    root.mainloop()

if __name__ == "__main__":
    main()
