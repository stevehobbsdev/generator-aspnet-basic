using Microsoft.AspNet.Mvc;

namespace <%= namespace %> 
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View();
		}
	}
}