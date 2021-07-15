using System;
using System.ComponentModel;
using System.Web.UI.WebControls.WebParts;

namespace SPVisualWebPart1_VN.VisualWebPart1
{
    [ToolboxItemAttribute(false)]
    public partial class VisualWebPart1 : WebPart
    {
        // Heben Sie die Auskommentierung des folgenden SecurityPermission-Attributs nur auf, wenn Sie eine Leistungsprofilerstellung für eine Farmlösung
        // mithilfe der Instrumentation-Methode durchführen, und entfernen Sie dann das SecurityPermission-Attribut, wenn der Code bereit für die
        // Produktion ist. Da das SecurityPermission-Attribut die Sicherheitsüberprüfung für Aufrufer Ihres
        // Konstruktors umgeht, wird es für Produktionszwecke nicht empfohlen.
        // [System.Security.Permissions.SecurityPermission(System.Security.Permissions.SecurityAction.Assert, UnmanagedCode = true)]
        public VisualWebPart1()
        {
        }

        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);
            InitializeControl();
        }

        protected void Page_Load(object sender, EventArgs e)
        {
        }
    }
}
