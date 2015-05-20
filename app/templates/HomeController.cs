using Microsoft.AspNet.Mvc;

namespace VNext 
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View();
		}
	}
}