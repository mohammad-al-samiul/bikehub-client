import { useForm, ValidationError } from "@formspree/react";
import { CheckCircle, Headset, MessageSquare, ThumbsUp } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const ContactPage = () => {
  const [state, handleSubmit] = useForm("xbjvlqkk");
  useEffect(() => {
    if (state.succeeded) {
      toast.success("Thanks for messaging");
    }
  }, [state.succeeded]);
  return (
    <div className="container my-12 mx-auto px-2 md:px-4">
      <section className="mb-32">
        <div className="flex justify-center">
          <div className="text-center md:max-w-xl lg:max-w-3xl">
            <h2 className="mb-12 px-6 text-3xl font-bold">Contact us</h2>
          </div>
        </div>
        <div className="flex flex-wrap">
          <form
            onSubmit={handleSubmit}
            className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6"
          >
            <div className="mb-3 w-full">
              <label
                className="block font-medium mb-[2px] text-gray-600"
                htmlFor="exampleInput90"
              >
                Name
              </label>
              <input
                type="text"
                className="px-2 py-2 border w-full outline-none rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                id="exampleInput90"
                placeholder="Name"
              />
            </div>

            <div className="mb-3 w-full">
              <label
                className="block font-medium mb-[2px] text-gray-600"
                htmlFor="exampleInput90"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="px-2 py-2 border w-full outline-none rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                placeholder="Enter your email address"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>

            <div className="mb-3 w-full">
              <label
                className="block font-medium mb-[2px] text-gray-600"
                htmlFor="exampleInput90"
              >
                Message
              </label>
              <textarea
                className="px-2 py-2 border w-full outline-none rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                id="message"
                name="message"
              ></textarea>
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </div>
            <div className="form-control">
              <input
                disabled={state.submitting}
                className="btn hover:text-white text-white bg-teal-500 border-none  hover:bg-teal-500"
                type="submit"
                value="SEND"
              />
            </div>
          </form>

          <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
            <div className="flex flex-wrap">
              {/* Customer Service */}
              <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <div className="inline-block rounded-md bg-teal-400-100 p-4 text-gray-600">
                      {/* Icon for Customer Service */}
                      <Headset className="h-10 w-10" />
                    </div>
                  </div>
                  <div className="ml-6 grow">
                    <p className="mb-2 font-bold">Customer Service</p>
                    <p className="text-neutral-500">service@bikerentals.com</p>
                    <p className="text-neutral-500">+1 234-567-89</p>
                  </div>
                </div>
              </div>

              {/* Bike Availability */}
              <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <div className="inline-block rounded-md bg-teal-400-100 p-4 text-gray-600">
                      {/* Icon for Bike Availability */}
                      <CheckCircle className="h-10 w-10" />
                    </div>
                  </div>
                  <div className="ml-6 grow">
                    <p className="mb-2 font-bold">Bike Availability</p>
                    <p className="text-neutral-500">
                      availability@bikerentals.com
                    </p>
                    <p className="text-neutral-500">+1 234-567-89</p>
                  </div>
                </div>
              </div>

              {/* Rental Inquiries */}
              <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <div className="inline-block rounded-md bg-teal-400-100 p-4 text-gray-600">
                      {/* Icon for Rental Inquiries */}
                      <MessageSquare className="h-10 w-10" />
                    </div>
                  </div>
                  <div className="ml-6 grow">
                    <p className="mb-2 font-bold">Rental Inquiries</p>
                    <p className="text-neutral-500">rentals@bikerentals.com</p>
                    <p className="text-neutral-500">+1 234-567-89</p>
                  </div>
                </div>
              </div>

              {/* Feedback & Suggestions */}
              <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <div className="inline-block rounded-md bg-teal-400-100 p-4 text-gray-600">
                      {/* Icon for Feedback */}
                      <ThumbsUp className="h-10 w-10" />
                    </div>
                  </div>
                  <div className="ml-6 grow">
                    <p className="mb-2 font-bold">Feedback & Suggestions</p>
                    <p className="text-neutral-500">feedback@bikerentals.com</p>
                    <p className="text-neutral-500">+1 234-567-89</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
