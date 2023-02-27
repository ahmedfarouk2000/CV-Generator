export class GlobalConstants {
    public static Education: boolean = true;
    public static Experience: boolean = true;
    public static Project: boolean = true;
    public static Skill: boolean = true;
    public static Contact: boolean = true;
    public static Avatar: boolean = true;


    public static layout: boolean = true;
    public static print: boolean = true;
    public static font: boolean = true;
    public static theme: boolean = true;
    public static AddContact: boolean = true;





    public static getVisible(type: "Education" | "Skill"
        | "Project" | "Experience" | "Avatar" | "Contact" | "layout" | "print" | "font" | "theme" | "AddContact"): boolean {
        return GlobalConstants[type];
    }

    public static setVisible(type: "Education" | "Skill"
    | "Project" | "Experience" | "Avatar" | "Contact" | "layout" | "print" | "font" | "theme" | "AddContact",value:any): void {
        GlobalConstants[type] = value;
    }

    public static toggleVisiable(type: "Education" | "Skill"
    | "Project" | "Experience" | "Avatar" | "Contact" | "layout" | "print" | "font" | "theme" | "AddContact"): void {
        GlobalConstants[type] = !GlobalConstants[type];
    }

    public static ReadyForPrint(): void {
        this.toggleVisiable('layout')
        this.toggleVisiable('theme')
        this.toggleVisiable('print')
        this.toggleVisiable('font')
        this.toggleVisiable('AddContact')
    }

}